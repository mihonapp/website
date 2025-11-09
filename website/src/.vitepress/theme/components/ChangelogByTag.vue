<script setup lang="ts">
import { computed, toRefs } from 'vue'
import MarkdownIt from 'markdown-it'
import { data as changelogs } from '../data/changelogs.data'
import Contributors from './Contributors.vue'

const props = defineProps<{ tag: string }>()
const { tag } = toRefs(props)

const md = new MarkdownIt({ html: true })

function renderMarkdown(string: string | null | undefined) {
  const body = string ?? 'No changelog provided.'
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
          .replace(/^###\s*/, '')
          .trim()
        const inner = md.render(text).trim()
        return `\n\n<div class="${cls} custom-block" style="display: contents"><p class="custom-block-title">${title}</p>${inner}</div>\n\n`
      },
    )
    .replace('https://github.com/mihonapp/mihon/releases', '/changelogs/')
    .replace(/https:\/\/github.com\/mihonapp\/mihon\/releases\/tag\/(.*)/g, '#$1')
    .trim()

  return md.render(flavoredString)
}

const release = computed(() => changelogs.find(r => r.tag_name === tag.value))
</script>

<template>
  <div v-if="release">
    <h1 :id="index === 0 ? 'latest' : release.tag_name">
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
    </h1>
    <time :datetime="release!.published_at!">{{ new Date(release!.published_at!).toLocaleDateString('en', { dateStyle: 'medium' }) }}</time>
    <div v-html="renderMarkdown(release!.body)" />
    <Contributors :body="release!.body!" :author="release!.author.login" :tag="release!.tag_name" />
  </div>
  <div v-else>
    <p>Release not found.</p>
  </div>
</template>
