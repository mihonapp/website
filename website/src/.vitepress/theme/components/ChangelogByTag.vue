<script setup lang="ts">
import { computed, toRefs } from 'vue'
import MarkdownIt from 'markdown-it'
import { data as changelogs } from '../data/changelogs.data'
import Contributors from './Contributors.vue'
import { formatChangelog } from '../utils/formatChangelog'
import moment from 'moment'

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

function formatBytes(bytes: number) {
  if (bytes === 0 || Number.isNaN(bytes)) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1)
  const val = bytes / Math.pow(k, i)
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : val >= 10 ? 1 : 2)} ${sizes[i]}`
}

function assetDate(dateStr?: string) {
  const d = dateStr ?? ''
  return {
    relative: d ? moment(d).fromNow() : '',
    exact: d ? moment(d).format('dddd, MMMM Do YYYY [at] HH:mm') : '',
    iso: d || undefined,
  }
}
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
    <details v-if="release!.assets && release!.assets.length" class="assets mt-4">
      <summary>
        <h3>
          Assets
          <Badge type="info" :text="String(release!.assets.length)" />
        </h3>
      </summary>
      <ul class="asset-list">
        <li v-for="asset in release!.assets" :key="asset.id" class="asset-row">
          <div class="left">
            <svg aria-hidden="true" height="16" width="16" viewBox="0 0 16 16" class="icon">
              <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z" />
            </svg>
            <a :href="asset.browser_download_url" class="name">{{ asset.name }}</a>
          </div>
          <div class="right">
            <span class="size">{{ formatBytes(asset.size) }}</span>
            <time class="date" :datetime="assetDate(asset.updated_at || asset.created_at).iso" :title="assetDate(asset.updated_at || asset.created_at).exact">
              {{ assetDate(asset.updated_at || asset.created_at).relative }}
            </time>
          </div>
        </li>
      </ul>
    </details>
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

.assets {
  summary {
    // keep the native disclosure marker and align content
    display: list-item
    cursor: pointer
    user-select: none
    list-style: disclosure-closed inside

    &::marker {
      color: var(--vp-c-text-2)
    }

    :where(details[open]) & {
      list-style: disclosure-open inside
    }

    h3 {
      display: inline-flex
      align-items: center
      gap: .5rem
      margin: 0
      vertical-align: middle
    }
  }

  .asset-list {
    margin: .75rem 0 0
    padding: 0
    list-style: none
    border: 1px solid var(--vp-c-divider)
    border-radius: 8px
    overflow: hidden
  }

  .asset-row {
    display: flex
    align-items: center
    justify-content: space-between
    gap: .5rem
    padding: .5rem .75rem
    border-top: 1px solid var(--vp-c-divider)
    font-size: .9375rem

    &:first-child { border-top: none }
  }

  .left {
    display: flex
    align-items: center
    gap: .4rem
    min-width: 0

    .icon {
      fill: var(--vp-c-text-3)
      flex: 0 0 auto
      width: 14px
      height: 14px
    }

    .name {
      color: var(--vp-c-text-1)
      max-width: 100%
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    }
  }

  .right {
    display: flex
    align-items: center
    gap: .75rem
    color: var(--vp-c-text-3)
    font-variant-numeric: tabular-nums
    flex: 0 0 auto
    white-space: nowrap

    .size { min-width: 56px; text-align: right }
    .date { min-width: 88px; text-align: right }
  }
}
</style>
