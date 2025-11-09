<script setup lang="ts">
import { computed, toRefs } from 'vue'
import MarkdownIt from 'markdown-it'
import { type AppRelease, data as release } from '../data/release.data'
import Contributors from './Contributors.vue'

const props = defineProps<{ type: keyof AppRelease }>()
const { type } = toRefs(props)

const md = new MarkdownIt({ html: true })

const changelog = computed(() => {
  const flavoredString = (release[type.value].body ?? '')
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
        return `\n\n<div class="${cls} custom-block"><p class="custom-block-title">${title}</p>${inner}</div>\n\n`
      },
    )
    .replace('https://github.com/mihonapp/mihon/releases', '/changelogs/')
    .replace(/https:\/\/github.com\/mihonapp\/mihon\/releases\/tag\/(.*)/g, '#$1')
    .trim()

  return md.render(flavoredString)
})
</script>

<template>
  <div class="changelog">
    <header>
      <IconNewspaperVariant />
      <h2>Changelog</h2>
    </header>
    <div v-html="changelog" />
    <Contributors
      :body="release[type].body!"
      :author="release[type].author.login"
      :tag="release[type].tag_name"
    />
  </div>
  <div class="fullChangelog">
    <p>
      View the full release
      <a :href="`/changelogs/${release[type].tag_name}`">
        here
      </a>
    </p>
  </div>
</template>

<style lang="stylus">
.changelog {
  display: block
  border: 1px solid var(--vp-c-bg-soft)
  border-radius: 12px
  background-color: var(--vp-c-bg-soft)
  transition: border-color 0.25s, background-color 0.25s
  padding: 24px
  height: 100%
  margin: 1.5em auto 0.5em

  header {
    display: flex
    justify-content: center
    align-items: baseline
    margin: 0 0 1rem
  }

  svg {
    font-size: 1.2em
    margin-right: 0.5rem
    vertical-align: middle
  }

  h2 {
    font-size: 1.5rem
    margin: 0
    padding: 0
    color: var(--vp-c-text-1)
    border: none
  }

  div > p {
    margin: 0 0 1rem
    color: var(--vp-c-text-2)
    font-size: 0.9rem
  }

  table {
    border-radius: 8px
    border-collapse: collapse
    border: 1px solid var(--vp-c-divider)

    tr,
    th,
    td {
      border: none
      width: 100%
    }

    tbody tr {
      border-top: 1px solid var(--vp-c-divider)
    }

    tr > td {
      &:first-child {
        color: var(--vp-c-text-2)
      }

      &:last-child {
        font-family: var(--vp-font-family-mono)
        font-size: var(--vp-code-font-size)
      }
    }
  }
}

.fullChangelog {
  margin: 0 0 1rem
  color: var(--vp-c-text-2)
  font-size: 0.9rem
}
</style>
