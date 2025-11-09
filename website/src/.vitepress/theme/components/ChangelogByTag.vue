<script setup lang="ts">
import { computed, toRefs } from 'vue'
import MarkdownIt from 'markdown-it'
import { data as changelogs } from '../data/changelogs.data'
import Contributors from './Contributors.vue'
import { formatChangelog } from '../utils/formatChangelog'

const props = defineProps<{ tag: string }>()
const { tag } = toRefs(props)

const md = new MarkdownIt({ html: true })

function renderMarkdown(string: string | null | undefined) {
  return formatChangelog(md, string, { stripChecksums: true })
}

const release = computed(() => changelogs.find(r => r.tag_name === tag.value))
const latestStableTag = computed(() => {
  const stable = changelogs
    .filter(r => !r.draft && !r.prerelease)
    .toSorted((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime())
  return stable[0]?.tag_name
})
const isLatest = computed(() => latestStableTag.value === tag.value)
</script>

<template>
  <div v-if="release">
    <h1 :id="isLatest ? 'latest' : release.tag_name">
      {{ release.tag_name.substring(1) }}
      <Badge v-if="isLatest" type="tip" text="Latest" />
      <a
        class="header-anchor"
        :href="isLatest ? '#latest' : `#${release.tag_name}`"
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

<style lang="stylus" scoped>
h1 {
  display: flex
  align-items: center
  gap: 0.5rem
}
</style>
