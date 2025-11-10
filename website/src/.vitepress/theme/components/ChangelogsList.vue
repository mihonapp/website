<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed } from 'vue'
import { data as betaChangelogs } from '../data/changelogs-beta.data'
import { data as stableChangelogs } from '../data/changelogs.data'
import { formatChangelog } from '../utils/formatChangelog'
import Contributors from './Contributors.vue'

const props = defineProps<{ repo?: string }>()

const changelogs = computed(() => {
  return props.repo === 'mihon-preview' ? betaChangelogs : stableChangelogs
})

const md = new MarkdownIt({ html: true })

function renderMarkdown(string: string | null | undefined) {
  const pre = (string ?? '').replace(
    'Check out the [past release notes](https://github.com/mihonapp/mihon/releases) if you’re upgrading from an earlier version. ',
    '',
  )
  return formatChangelog(md, pre, { stripChecksums: true })
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
        :href="props.repo === 'mihon-preview' ? `/changelogs/beta/${release.tag_name}` : `/changelogs/${release.tag_name}`"
      >
        {{ props.repo === 'mihon-preview' ? release.tag_name : release.tag_name.substring(1) }}
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
