<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { data as changelogs } from '../data/changelogs.data'
import Contributors from './Contributors.vue'

const md = new MarkdownIt({ html: true })

function renderMarkdown(string: string | null | undefined) {
  const body = string ?? 'No changelog provided.'
  console.log(body)
  const flavoredString = body
    .split(/---\r\n\r\n### Checksums|---\r\n\r\nMD5/)[0]
    .replace(/(?<=\(|(, ))@(.*?)(?=\)|(, ))/g, '[@$2](https://github.com/$2)')
    .replace(/#(\d+)/g, '[#$1](https://github.com/mihonapp/mihon/issues/$1)')
    .replace(/\b([0-9a-f]{7,10})\b/gi, '[$1](https://github.com/mihonapp/mihon/commit/$1)')
    .replace(/<!-->/g, '')
    .replace(
      /^> \[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)]\r?\n((?:^>.*\r?\n?)+)/gim,
      (_match, typeRaw: string, block: string) => {
        const type = typeRaw.toUpperCase()
        const map: Record<string, { cls: string; title: string }> = {
          TIP: { cls: 'tip', title: 'TIP' },
          NOTE: { cls: 'info', title: 'INFO' },
          IMPORTANT: { cls: 'warning', title: 'WARNING' },
          WARNING: { cls: 'warning', title: 'WARNING' },
          CAUTION: { cls: 'danger', title: 'DANGER' },
        }
        const { cls, title } = map[type] ?? map.TIP
        const text = block
        .split(/\r?\n/)
        .map((l: string) => l.replace(/^>\s?/, ''))
        .join('\n')
        .replace(/###\s*/, '')
        .trim()
        const inner = md.render(text).trim()
        return `\n\n<div class="${cls} custom-block"><div class="custom-block-body" style="display: flex; flex-direction: column"><p class="custom-block-title">${title}</p>${inner}</div></div>\n\n`
      },
    )
    .replace("Check out the [past release notes](https://github.com/mihonapp/mihon/releases) if you’re upgrading from an earlier version. ", "")
    .replace('https://github.com/mihonapp/mihon/releases', '/changelogs/')
    .replace(/https:\/\/github.com\/mihonapp\/mihon\/releases\/tag\/(.*)/g, '#$1')
    .trim()

  return md.render(flavoredString)
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
})
</script>

<template>
  <div
    v-for="(release, index) of changelogs"
    :key="release.tag_name"
  >
    <h2 :id="index === 0 ? 'latest' : release.tag_name">
      <a
        :href="`/changelogs/${release.tag_name}`"
      >
        {{ release.tag_name.substring(1) }}
      </a>
      <Badge v-if="index === 0" type="tip" text="Latest" />
      <a
        class="header-anchor"
        :href="index === 0 ? '#latest' : `#${release.tag_name}`"
        :aria-label="`Permalink to &quot;${release.tag_name}&quot;`"
      />
    </h2>
    <time :datetime="release.published_at!">
      {{ dateFormatter.format(new Date(release.published_at!)) }}
    </time>
    <div v-html="renderMarkdown(release.body)" />
    <Contributors
      :body="release.body!"
      :author="release.author.login"
      :tag="release.tag_name"
    />
  </div>
</template>

<style lang="stylus" scoped>
h2 {
  margin-bottom: 0
  display: flex
  align-items: center
  gap: 0.5rem
}

time {
  font-size: 0.875rem
  color: var(--vp-c-text-2)
}
</style>
