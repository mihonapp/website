import type { HeadConfig, TransformContext } from 'vitepress'

function generateMeta(context: TransformContext, hostname: string) {
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

  const componentEmbed = {
    component: {
      type: 17,
      accent_color: 22688,
      components: [
        {
          type: 9,
          components: [{
            type: 10,
            content: `# [${truncateUtf8(String(title), 70)}](${url})${description ? `\n${truncateUtf8(String(description), 350)}` : ''}`,
          }],
          accessory: {
            type: 11,
            media: { url: imageUrl },
          },
        },
        {
          type: 1,
          components: [{
            type: 2,
            style: 5,
            url,
            label: 'Open page',
          }],
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
