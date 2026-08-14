<script setup lang="ts">
/// <reference types="@types/gtag.js" />

import type { Component } from 'vue'
import {
  IconAlertOutline,
  IconAndroid,
  IconBird,
  IconCalendarOutline,
  IconFlaskOutline,
  IconTagOutline,
} from '@iconify-prerendered/vue-mdi'
import { computed, onMounted, ref } from 'vue'
import { data as release } from '../data/release.data'
import ReleaseDate from './ReleaseDate.vue'

type ReleaseId = 'beta' | 'foss' | 'nightly' | 'stable'
type ReleaseDateType = 'beta' | 'stable'
type ButtonTone = 'primary' | 'secondary' | 'tertiary'

interface DownloadCard {
  id: ReleaseId
  asset?: { browser_download_url: string, name: string }
  buttonTone: ButtonTone
  dateType?: ReleaseDateType
  description: string
  icon?: Component
  isPrimary?: boolean
  note?: string
  tagName: string
  title: string
  useMihonLogo?: boolean
}

const props = withDefaults(defineProps<{
  group?: 'all' | 'other' | 'primary'
}>(), {
  group: 'all',
})

const downloadInformation = computed(() => ({
  // The preview-release feed is Nightly until Beta has its own endpoint.
  nightly: {
    tagName: release.beta.tag_name ?? 'r0000',
    asset: (release.beta.assets ?? [])
      .find(asset => /^mihon-r\d{4,}.apk/.test(asset.name)),
  },
  foss: {
    tagName: release.stable.tag_name ?? 'v0.00.0',
    asset: (release.stable.assets ?? [])
      .find(asset => /^mihon-v\d+\.\d+\.\d+-foss\.apk/.test(asset.name)),
  },
  stable: {
    tagName: release.stable.tag_name ?? 'v0.00.0',
    asset: (release.stable.assets ?? [])
      .find(asset => /^mihon-v\d+\.\d+\.\d+.apk/.test(asset.name)),
  },
}))

const downloadCards = computed<DownloadCard[]>(() => [
  {
    id: 'stable',
    ...downloadInformation.value.stable,
    buttonTone: 'primary',
    dateType: 'stable',
    description: 'Recommended for most users',
    isPrimary: true,
    note: 'Requires Android 8.0 or higher.',
    title: 'Stable',
    useMihonLogo: true,
  },
  // Add the future Beta card here. Its isPrimary flag will place it beside Stable.
  {
    id: 'nightly',
    ...downloadInformation.value.nightly,
    buttonTone: 'secondary',
    dateType: 'beta',
    description: 'May contain unfinished features or stability issues',
    icon: IconFlaskOutline,
    title: 'Nightly',
  },
  {
    id: 'foss',
    ...downloadInformation.value.foss,
    buttonTone: 'tertiary',
    dateType: 'stable',
    description: 'A fully FOSS-compliant build, compiled from GitHub source code.',
    icon: IconBird,
    title: 'FOSS',
  },
].filter(card => card.asset))

const visibleDownloadCards = computed(() => downloadCards.value.filter((card) => {
  if (props.group === 'primary')
    return card.isPrimary

  if (props.group === 'other')
    return !card.isPrimary

  return true
}))

const isAndroid = ref(true)

onMounted(() => {
  if (props.group === 'other')
    return

  isAndroid.value = !!navigator.userAgent.match(/android/i)
})

function handleAnalytics(type: ReleaseId) {
  const label = type[0].toUpperCase() + type.slice(1)
  const version = type === 'stable' || type === 'foss'
    ? release.stable.tag_name
    : release.beta.tag_name

  window.gtag?.('event', 'Download', {
    event_category: 'App',
    event_label: label,
    version,
  })
}
</script>

<template>
  <div>
    <div v-if="props.group !== 'other' && !isAndroid" class="custom-block danger">
      <p class="custom-block-title">
        Unsupported operating system
      </p>
      <p>
        <strong>Mihon</strong> is only available on Android. Any non-Android app named <strong>Mihon</strong> is unaffiliated with this project.
      </p>
      <p>
        Read the <a href="/docs/faq/general">General FAQ</a> for more information.
      </p>
    </div>
    <section class="release-selector" aria-label="Choose your release">
      <div class="release-cards" :class="{ 'has-beta': visibleDownloadCards.some(card => card.id === 'beta') }">
        <article
          v-for="card in visibleDownloadCards"
          :key="card.id"
          class="release-card"
          :class="[card.id, { 'is-primary': card.isPrimary }]"
        >
          <div class="release-card-header">
            <span class="release-icon" aria-hidden="true">
              <span v-if="card.useMihonLogo" class="mihon-logo" />
              <component :is="card.icon" v-else />
            </span>
            <div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>
          </div>
          <dl v-if="card.dateType" class="release-details">
            <div>
              <IconTagOutline aria-hidden="true" />
              <div class="release-detail-copy">
                <dt>Latest release:</dt>
                <dd>{{ card.tagName }}</dd>
              </div>
            </div>
            <div>
              <IconCalendarOutline aria-hidden="true" />
              <div class="release-detail-copy">
                <dt>Released:</dt>
                <dd><ReleaseDate :type="card.dateType" /></dd>
              </div>
            </div>
          </dl>
          <div class="release-actions">
            <a
              class="download-button"
              :class="card.buttonTone"
              :download="card.asset?.name"
              :href="card.asset?.browser_download_url"
              @click="handleAnalytics(card.id)"
            >
              <IconDownload />
              <span class="text">Mihon {{ card.title }}</span>
              <span class="version">{{ card.tagName }}</span>
            </a>
            <span v-if="card.note" class="release-action-note">
              <IconAndroid v-if="card.id === 'stable'" aria-hidden="true" />
              <IconAlertOutline v-else aria-hidden="true" />
              <span>{{ card.note }}</span>
            </span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="stylus">
.release-selector {
  margin: 1.5rem auto 0
}

.release-cards {
  display: grid
  grid-template-columns: 1fr
  gap: 1rem

  &.has-beta {
    grid-template-columns: repeat(2, minmax(0, 1fr))

    .release-card:not(.is-primary) {
      grid-column: 1 / -1
    }
  }
}

.release-card {
  display: grid
  grid-template-columns: minmax(0, 1fr) auto
  align-items: center
  gap: 0.75rem 1.5rem
  min-width: 0
  border: 1px solid var(--vp-c-divider)
  border-radius: 14px
  padding: 0.9rem 1rem
  background: var(--vp-c-bg-soft)

  &.is-primary {
    grid-template-columns: minmax(13rem, 0.85fr) minmax(17rem, 1fr) minmax(14rem, auto)
    gap: 0.75rem 1.5rem
    padding: 1.15rem 1.25rem
    border-color: var(--vp-c-brand-border)
    background: linear-gradient(135deg, rgba(78, 103, 205, 0.25), rgba(43, 57, 128, 0.18))
    box-shadow: 0 12px 32px rgba(45, 59, 137, 0.18)

    .release-card-header {
      grid-column: 1
      grid-row: 1
    }

    .release-details {
      grid-column: 2
      grid-row: 1 / span 2
      margin: 0
    }

    .release-actions {
      display: contents
    }

    .download-button {
      grid-column: 3
      grid-row: 1 / span 2
      min-width: 14rem
      line-height: 3.25rem
    }

    .release-action-note {
      grid-column: 1
      grid-row: 2
      margin: 0
    }
  }

  &.nightly,
  &.foss {
    grid-template-columns: minmax(0, 1fr) auto auto

    .release-card-header {
      grid-column: 1
      grid-row: 1
    }

    .release-details {
      grid-column: 2
      grid-row: 1
    }

    .release-actions {
      display: contents
    }

    .download-button {
      grid-column: 3
      grid-row: 1
      width: auto
      min-width: 12.5rem
    }

    .release-action-note {
      grid-column: 1 / -1
      grid-row: 2
      margin: 0
    }
  }

  &.nightly {
    border-color: #514328
    background: linear-gradient(135deg, rgba(171, 132, 36, 0.12), rgba(105, 78, 21, 0.08))
  }
}

html:not(.dark) {
  .release-card {
    border-color: #d8d8df
    background: #f5f5f7
    box-shadow: 0 1px 2px rgba(31, 35, 45, 0.08)

    &.is-primary {
      border-color: var(--vp-c-brand-border)
      background: linear-gradient(135deg, #dce1ff, #eef0ff)
      box-shadow: 0 8px 24px rgba(88, 101, 190, 0.16)
    }

    &.nightly {
      border-color: #d5c9a1
      background: linear-gradient(135deg, #fff7df, #fffdf6)
    }
  }

  .release-card.is-primary .release-icon {
    color: #34437e
    background: #bfc9ff
  }

  .release-card.nightly .release-icon {
    color: #765d09
    background: #f4e2a5
  }

  .release-card.nightly .download-button.secondary {
    color: #604900
    background-color: #f5df95

    &:hover {
      color: #4d3a00
      background-color: #edcf6d
    }
  }
}

.release-card-header {
  display: flex
  align-items: center
  gap: 0.85rem
  min-width: 0

  h3,
  p {
    margin: 0
  }

  h3 {
    font-size: 1.05rem
  }

  p {
    margin-top: 0.1rem
    color: var(--vp-c-text-2)
    font-size: 0.85rem
    line-height: 1.4
  }

  .is-primary & h3 {
    font-size: 1.5rem
  }

  .is-primary & p {
    font-size: 1rem
  }
}

.release-icon {
  display: grid
  width: 2.5rem
  height: 2.5rem
  flex: 0 0 auto
  place-items: center
  border-radius: 50%
  color: var(--vp-c-text-1)
  background: var(--vp-c-default-soft)

  svg {
    font-size: 1.25rem
  }

  .mihon-logo {
    width: 1.4rem
    height: 1.4rem
    background: currentColor
    mask: url('/img/mihon.svg') center / contain no-repeat
  }

  .is-primary & {
    width: 4rem
    height: 4rem
    color: #dce4ff
    background: rgba(88, 112, 223, 0.35)

    .mihon-logo {
      width: 2.25rem
      height: 2.25rem
    }
  }
}

.release-details {
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 0.5rem 1rem
  margin: 0

  > div {
    display: flex
    align-items: center
    gap: 0.5rem
    min-width: 0
  }

  svg {
    width: 1.75rem
    height: 1.75rem
    flex: 0 0 auto
    padding: 0.4rem
    border-radius: 50%
    color: var(--vp-c-text-2)
    background: var(--vp-c-default-soft)

    .is-primary & {
      color: var(--vp-c-brand-darker)
      background: var(--vp-c-brand-dimm)
    }
  }

  .release-detail-copy {
    display: flex
    flex-direction: column
    min-width: 0
  }

  dt,
  dd {
    margin: 0
    font-size: 0.78rem
  }

  dt {
    color: var(--vp-c-text-2)
  }

  dd {
    overflow: hidden
    color: var(--vp-c-text-1)
    font-weight: 600
    text-overflow: ellipsis
    white-space: nowrap
  }

  .is-primary & {
    display: grid
    grid-template-columns: 1fr

    .release-detail-copy {
      display: inline-flex
      flex-direction: row
      align-items: baseline
      gap: 0.5rem
    }

    dt,
    dd {
      font-size: 1rem
    }
  }
}

.release-actions {
  margin-top: 0.25rem
  padding-top: 0.25rem
}

.download-button {
  display: block
  width: 100%
  border-radius: 9px
  padding: 0 0.9rem
  text-align: center
  font-size: 0.9rem
  font-weight: 600
  line-height: 2.6rem
  white-space: nowrap
  cursor: pointer
  transition: color 0.25s, background-color 0.25s

  &:hover {
    text-decoration: none !important
  }

  &.primary {
    color: var(--vp-button-brand-text)
    background-color: var(--vp-button-brand-bg)

    &:hover {
      color: var(--vp-button-brand-hover-text)
      background-color: var(--vp-button-brand-hover-bg)
    }
  }

  &.secondary {
    color: #fff1c7
    background-color: #765d19

    &:hover {
      color: #fff7de
      background-color: #8b701e
    }
  }

  &.tertiary {
    color: var(--vp-button-alt-text)
    background-color: var(--vp-button-alt-bg)

    &:hover {
      color: var(--vp-button-alt-hover-text)
      background-color: var(--vp-button-alt-hover-bg)
    }
  }

  svg {
    display: inline-block
    margin-right: 0.4em
    font-size: 1.15em
    vertical-align: middle
  }

  .text {
    margin-right: 0.45rem
  }

  .version {
    font-size: 0.8em
  }
}

.release-action-note {
  display: flex
  align-items: flex-start
  gap: 0.45rem
  margin: 0.6rem 0 0
  color: var(--vp-c-text-2)
  font-size: 0.82rem
  line-height: 1.4

  svg {
    flex: 0 0 auto
    margin-top: 0.05rem
    font-size: 1rem
  }
}

@media (max-width 960px) {
  .release-card.is-primary {
    grid-template-columns: minmax(0, 1fr) auto
    grid-template-rows: auto auto auto

    .release-card-header,
    .release-details {
      grid-column: 1
    }

    .release-card-header {
      grid-row: 1
    }

    .release-details {
      grid-row: 2
      grid-template-columns: repeat(2, minmax(0, 1fr))
    }

    .download-button {
      grid-column: 2
      grid-row: 1 / span 2
      min-width: 14rem
    }

    .release-action-note {
      grid-column: 1
      grid-row: 3
    }
  }
}

@media (max-width 640px) {
  .release-cards,
  .release-cards.has-beta {
    grid-template-columns: 1fr
  }

  .release-card,
  .release-card.is-primary {
    display: flex
    align-items: stretch
    flex-direction: column
    padding: 1.15rem
  }

  .release-card.nightly,
  .release-card.foss {
    .release-actions {
      display: block
    }

    .download-button {
      width: 100%
      min-width: 0
    }

    .release-action-note {
      margin-top: 0.6rem
    }
  }

  .release-card.is-primary .release-details {
    grid-template-columns: 1fr
    margin: 0.75rem 0
  }

  .release-actions {
    margin-top: 0.25rem
  }

  .download-button {
    line-height: 3rem
  }
}
</style>
