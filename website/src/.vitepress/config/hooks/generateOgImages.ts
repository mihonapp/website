import type { ContentData, SiteConfig } from 'vitepress'
import type { SatoriOptions } from 'x-satori/vue'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Octokit } from '@octokit/rest'
import { renderAsync } from '@resvg/resvg-js'
import { createContentLoader } from 'vitepress'
import { satoriVue } from 'x-satori/vue'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __fonts = resolve(__dirname, '../../fonts')

async function generateOgImages(config: SiteConfig) {
  const pages = await createContentLoader('**/*.md', { excerpt: true }).load()
  const template = await readFile(resolve(__dirname, '../../theme/components/OgImageTemplate.vue'), 'utf-8')

  const fonts: SatoriOptions['fonts'] = [
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-Regular.otf')),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-Medium.otf')),
      weight: 500,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-SemiBold.otf')),
      weight: 600,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: await readFile(resolve(__fonts, 'Inter-Bold.otf')),
      weight: 700,
      style: 'normal',
    },
  ]

  const filteredPages = pages.filter(p =>
    p.frontmatter.image === undefined
    && !p.url.startsWith('/changelogs/'),
  )

  for (const page of filteredPages) {
    await generateImage({
      page,
      template,
      outDir: config.outDir,
      fonts,
    })
  }

  // Extract first H3 section title and its bullet points from a changelog body
  function extractChangelogSnippet(body: string | null | undefined): string | undefined {
    if (!body)
      return undefined
    const src = body.replace(/\r/g, '')
    // Cut off checksum sections to avoid noise
    const cleaned = src.split(/---\n\n###\s*Checksums|---\n\nMD5/i)[0] || src
    // Find first H3 section
    const match = cleaned.match(/^###\s+(\S[^\n]*)\n([\s\S]*?)(?=^#{1,3}\s|Z)/m)
    if (!match)
      return undefined
    const headingRaw = match[1].trim()
    const heading = stripParens(stripLeadingIcon(headingRaw))
    const section = match[2]
    // Collect bullet points under this H3
    let bullets = section
      .split('\n')
      .map(l => l.trim())
      .filter(l => /^[-*]\s+/.test(l))
      .map(l => l.replace(/^[-*]\s+/, ''))
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    if (bullets.length === 0) {
      return `<div style="font-weight:700">${esc(heading.slice(0, 220))}</div>`
    }
    // Sanitize bullets: remove images, links (keep label), inline code, and parenthetical content
    bullets = bullets.map((b) => {
      const t = b
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .trim()
      return stripParens(t)
    }).filter(Boolean)
    const top = bullets.slice(0, 3)
    const bulletDivs = top.map(b => `<div>• ${esc(b)}</div>`).join('')
    return `<div style="font-weight:700">${esc(heading)}</div>${bulletDivs}`
  }

  function stripLeadingIcon(s: string): string {
  // Remove leading non-alphanumeric symbols/emojis followed by optional spaces
    return s.replace(/^[^\p{L}\p{N}]+/u, '')
  }

  function stripParens(s: string): string {
  // Remove any parenthetical segments: "(text)"
    return s.replace(/\s*\([^)]*\)/g, '').trim()
  }

  // Generate OG images for dynamic changelog pages
  const octokit = new Octokit()
  const releases = await octokit.paginate(octokit.repos.listReleases, {
    owner: 'mihonapp',
    repo: 'mihon',
    per_page: 100,
  })

  for (const r of releases) {
    if (!r.tag_name)
      continue
    const pageLike: Pick<ContentData, 'url' | 'frontmatter'> = {
      url: `/changelogs/${r.tag_name}`,
      frontmatter: {
        // Prefer release name; fallback to tag
        title: r.name || `Mihon ${r.tag_name.substring(1)}`,
        description: extractChangelogSnippet(r.body),
      } as any,
    }

    await generateImage({
      page: pageLike,
      template,
      outDir: config.outDir,
      fonts,
    })
  }
}

export default generateOgImages

interface GenerateImagesOptions {
  page: Pick<ContentData, 'url' | 'frontmatter'>
  template: string
  outDir: string
  fonts: SatoriOptions['fonts']
}

function getDir(url: string) {
  if (url.startsWith('/docs/faq/'))
    return 'FAQ'
  else if (url.startsWith('/docs/guides/'))
    return 'Guide'
  else if (url.startsWith('/news/') && url !== '/news/')
    return 'News'
  else if (url.startsWith('/changelogs/'))
    return 'Changelog'

  return undefined
}

async function generateImage({ page, template, outDir, fonts }: GenerateImagesOptions) {
  const { frontmatter, url } = page

  const options: SatoriOptions = {
    width: 1200,
    height: 628,
    fonts,
    props: {
      title:
                frontmatter.layout === 'home'
                  ? frontmatter.hero.name ?? frontmatter.title
                  : frontmatter.customMetaTitle ?? frontmatter.title,
      description:
                frontmatter.layout === 'home'
                  ? frontmatter.hero.tagline ?? frontmatter.description
                  : frontmatter.description,
      dir: getDir(url),
    },
  }

  const svg = await satoriVue(options, template)

  const render = await renderAsync(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })

  const outputFolder = resolve(outDir, url.substring(1), '__og_image__')
  const outputFile = resolve(outputFolder, 'og.png')

  await mkdir(outputFolder, { recursive: true })

  return await writeFile(outputFile, render.asPng())
}
