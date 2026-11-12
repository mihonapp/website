import type { HeadConfig, TransformContext } from 'vitepress'
import { getReleaseData } from '../releaseData'

async function generateMeta(context: TransformContext, hostname: string) {
  const head: HeadConfig[] = []
  const { pageData } = context

  const url = `${hostname}/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2')}`

  const addMetaTag = (name: string, content: any) => {
    if (content !== undefined && content !== null)
      head.push(['meta', { name, content: String(content) }])
  }

  const addPropertyTag = (property: string, content: any) => {
    if (content !== undefined && content !== null)
      head.push(['meta', { property, content: String(content) }])
  }

  const addLinkTag = (rel: string, href: string, type?: string, title?: string) => {
    if (href) {
      const attributes: { rel: string, href: string, type?: string, title?: string } = { rel, href }
      if (type)
        attributes.type = type
      if (title)
        attributes.title = title
      head.push(['link', attributes])
    }
  }

  head.push(['link', { rel: 'canonical', href: url }])
  addPropertyTag('og:url', url)
  addMetaTag('twitter:url', url)
  addMetaTag('twitter:card', 'summary_large_image')

  if (pageData.frontmatter.theme)
    addMetaTag('theme-color', pageData.frontmatter.theme)

  if (pageData.frontmatter.type)
    addPropertyTag('og:type', pageData.frontmatter.type)

  if (pageData.frontmatter.customMetaTitle) {
    addPropertyTag('og:title', pageData.frontmatter.customMetaTitle)
    addMetaTag('twitter:title', pageData.frontmatter.customMetaTitle)
    addPropertyTag('og:site_name', '')
  }
  else {
    addPropertyTag('og:title', pageData.frontmatter.title)
    addMetaTag('twitter:title', pageData.frontmatter.title)
  }

  if (pageData.frontmatter.description) {
    addPropertyTag('og:description', pageData.frontmatter.description)
    addMetaTag('twitter:description', pageData.frontmatter.description)
  }

  if (pageData.frontmatter.image) {
    const imageUrl = `${hostname}/${pageData.frontmatter.image.replace(/^\//, '')}`
    addPropertyTag('og:image', imageUrl)
    addMetaTag('twitter:image', imageUrl)
  }
  else {
    const imageFinal = `${url.replace(/\/$/, '')}/__og_image__/og.png`
    addPropertyTag('og:image', imageFinal)
    addPropertyTag('og:image:width', '1200')
    addPropertyTag('og:image:height', '628')
    addPropertyTag('og:image:type', 'image/png')
    addPropertyTag('og:image:alt', pageData.frontmatter.title)
    addMetaTag('twitter:image', imageFinal)
    addMetaTag('twitter:image:width', '1200')
    addMetaTag('twitter:image:height', '628')
    addMetaTag('twitter:image:alt', pageData.frontmatter.title)
  }

  const title = pageData.frontmatter.customMetaTitle || pageData.frontmatter.title || pageData.title
  const description = pageData.frontmatter.description || pageData.description
  const imageUrl = pageData.frontmatter.image
    ? `${hostname}/${pageData.frontmatter.image.replace(/^\//, '')}`
    : `${url.replace(/\/$/, '')}/__og_image__/og.png`

  const truncateUtf8 = (value: string, maxBytes: number) => {
    let result = ''
    let bytes = 0

    for (const character of value) {
      const characterBytes = Buffer.byteLength(character, 'utf8')
      if (bytes + characterBytes > maxBytes)
        break
      result += character
      bytes += characterBytes
    }

    return result
  }

  const actions: Array<{ type: number, style: number, url: string, label: string }> = []
  const addAction = (label: string, href: string) => {
    actions.push({ type: 2, style: 5, url: href, label })
  }
  const needsReleaseData = pageData.filePath.startsWith('changelogs/') || pageData.filePath === 'download/index.md'
  const releases = needsReleaseData ? await getReleaseData() : undefined
  const latestRelease = releases?.stableLatest
  const releaseTag = (pageData as any).params?.tag as string | undefined
  const pageRelease = pageData.filePath === 'changelogs/[tag].md' && releaseTag
    ? releases?.stable.find(release => release.tag_name === releaseTag)
    : latestRelease
  const stableApk = pageRelease?.assets.find(asset => /^mihon-v\d+\.\d+\.\d+\.apk/.test(asset.name))

  let contextLabel = 'MIHON'
  if (pageData.filePath === 'index.md') {
    contextLabel = 'MIHON · ANDROID MANGA READER'
    addAction('Get Mihon', `${hostname}/download/`)
    addAction('Getting started', `${hostname}/docs/guides/getting-started`)
  }
  else if (pageData.filePath === 'download/index.md') {
    contextLabel = 'MIHON DOWNLOADS'
    if (stableApk)
      addAction('Download', stableApk.browser_download_url)
    if (latestRelease)
      addAction('Changelog', `${hostname}/changelogs/${latestRelease.tag_name}`)
  }
  else if (pageData.filePath.startsWith('changelogs/')) {
    contextLabel = 'MIHON RELEASES'
    if (stableApk)
      addAction('Download', stableApk.browser_download_url)
    addAction('All changelogs', `${hostname}/changelogs/`)
  }
  else if (pageData.filePath.startsWith('docs/faq/')) {
    contextLabel = 'MIHON · FREQUENTLY ASKED QUESTIONS'
    addAction('Browse guides', `${hostname}/docs/guides/getting-started`)
    addAction('Download Mihon', `${hostname}/download/`)
  }
  else if (pageData.filePath.startsWith('docs/')) {
    contextLabel = 'MIHON · GUIDE'
    addAction('Download Mihon', `${hostname}/download/`)
    addAction('Browse FAQs', `${hostname}/docs/faq/general`)
  }
  else if (pageData.filePath.startsWith('news/')) {
    contextLabel = 'MIHON NEWS'
    addAction('All news', `${hostname}/news/`)
    addAction('Download Mihon', `${hostname}/download/`)
  }
  else if (pageData.filePath.startsWith('forks/')) {
    contextLabel = 'MIHON · COMMUNITY FORKS'
    addAction('All forks', `${hostname}/forks/`)
    addAction('Download Mihon', `${hostname}/download/`)
  }

  if (!actions.length)
    addAction('Open page', url)

  const componentText = `**${contextLabel}**\n# [${truncateUtf8(String(title), 70)}](${url})${description ? `\n${truncateUtf8(String(description), 350)}` : ''}`

  const componentEmbed = {
    component: {
      type: 17,
      accent_color: 22688,
      components: [
        {
          type: 10,
          content: componentText,
        },
        {
          type: 1,
          components: actions,
        },
        {
          type: 12,
          items: [{ media: { url: imageUrl } }],
        },
      ],
    },
  }

  const componentEmbedJson = JSON.stringify(componentEmbed).replace(/</g, '\\u003c')
  if (Buffer.byteLength(componentEmbedJson, 'utf8') <= 3000) {
    head.push(['script', {
      id: 'discord:component-embed',
      type: 'application/json',
    }, componentEmbedJson])
  }

  if (pageData.frontmatter.tag)
    addPropertyTag('article:tag', pageData.frontmatter.tag)

  if (pageData.frontmatter.date)
    addPropertyTag('article:published_time', pageData.frontmatter.date)

  if (pageData.lastUpdated && pageData.frontmatter.lastUpdated !== false)
    addPropertyTag('article:modified_time', new Date(pageData.lastUpdated).toISOString())

  if (pageData.filePath === 'news/index.md') {
    addLinkTag('alternate', `${hostname}/feed.rss`, 'application/rss+xml', 'RSS feed for the news archive')
    addLinkTag('alternate', `${hostname}/news.json`, 'application/json', 'JSON of the news archive')
  }

  return head
}

export default generateMeta
