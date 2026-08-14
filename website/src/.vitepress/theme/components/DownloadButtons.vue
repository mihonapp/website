<script setup lang="ts">
/// <reference types="@types/gtag.js" />

import {
  IconAlertOutline,
  IconAndroid,
  IconCalendarOutline,
  IconFlaskOutline,
  IconInformationOutline,
  IconLeaf,
  IconTagOutline,
} from '@iconify-prerendered/vue-mdi'
import { computed, onMounted, ref } from 'vue'
import { data as release } from '../data/release.data'
import ReleaseDate from './ReleaseDate.vue'

const downloadInformation = computed(() => ({
  beta: {
    tagName: release.beta.tag_name ?? 'r0000',
    asset: (release.beta.assets ?? [])
      .find(a => /^mihon-r\d{4,}.apk/.test(a.name)),
  },
  foss: {
    tagName: release.stable.tag_name ?? 'v0.00.0',
    asset: (release.stable.assets ?? [])
      .find(a => /^mihon-v\d+\.\d+\.\d+-foss\.apk/.test(a.name)),
  },
  stable: {
    tagName: release.stable.tag_name ?? 'v0.00.0',
    asset: (release.stable.assets ?? [])
      .find(a => /^mihon-v\d+\.\d+\.\d+.apk/.test(a.name)),
  },
}))

const isAndroid = ref(true)
// Beta downloads are temporarily unavailable.
const showBeta = false

onMounted(() => {
  isAndroid.value = !!navigator.userAgent.match(/android/i)
})

function handleAnalytics(type: 'beta' | 'foss' | 'stable') {
  window.gtag?.('event', 'Download', {
    event_category: 'App',
    event_label: type === 'stable' ? 'Stable' : type === 'beta' ? 'Beta' : 'FOSS',
    version: type === 'beta'
      ? release.beta.tag_name
      : release.stable.tag_name,
  })
}
</script>

<template>
  <div>
    <div v-if="!isAndroid" class="custom-block danger">
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
      <div class="release-cards" :class="{ 'stable-only': !showBeta }">
        <article class="release-card stable">
          <div class="release-card-header">
            <span class="release-icon" aria-hidden="true"><span class="mihon-logo" /></span>
            <div>
              <h3>Stable</h3>
              <p>Recommended for most users</p>
            </div>
          </div>
          <dl class="release-details">
            <div>
              <IconTagOutline aria-hidden="true" />
              <div class="release-detail-copy">
                <dt>Latest release:</dt>
                <dd>{{ downloadInformation.stable.tagName }}</dd>
              </div>
            </div>
            <div>
              <IconCalendarOutline aria-hidden="true" />
              <div class="release-detail-copy">
                <dt>Released:</dt>
                <dd><ReleaseDate type="stable" /></dd>
              </div>
            </div>
          </dl>
          <div class="release-actions">
            <a
              class="download-button primary"
              :download="downloadInformation.stable.asset?.name"
              :href="downloadInformation.stable.asset?.browser_download_url"
              @click="handleAnalytics('stable')"
            >
              <IconDownload />
              <span class="text">Mihon</span>
              <span class="version">{{ downloadInformation.stable.tagName }}</span>
            </a>
            <span class="release-action-note">
              <IconAndroid aria-hidden="true" />
              <span>Requires <strong>Android 8.0</strong> or higher.</span>
            </span>
          </div>
        </article>
        <article v-if="showBeta" class="release-card beta">
          <div class="release-card-header">
            <span class="release-icon" aria-hidden="true"><IconFlaskOutline /></span>
            <div>
              <h3>Beta</h3>
              <p>Preview upcoming changes</p>
            </div>
          </div>
          <dl class="release-details">
            <div>
              <IconTagOutline aria-hidden="true" />
              <div class="release-detail-copy">
                <dt>Latest release:</dt>
                <dd>{{ downloadInformation.beta.tagName }}</dd>
              </div>
            </div>
            <div>
              <IconCalendarOutline aria-hidden="true" />
              <div class="release-detail-copy">
                <dt>Released:</dt>
                <dd><ReleaseDate type="beta" /></dd>
              </div>
            </div>
          </dl>
          <div class="release-actions">
            <a
              class="download-button secondary"
              :download="downloadInformation.beta.asset?.name"
              :href="downloadInformation.beta.asset?.browser_download_url"
              @click="handleAnalytics('beta')"
            >
              <IconDownload />
              <span class="text">Mihon Beta</span>
              <span class="version">{{ downloadInformation.beta.tagName }}</span>
            </a>
            <span class="release-action-note">
              <IconAlertOutline aria-hidden="true" />
              <span>May contain unfinished features or stability issues.</span>
            </span>
          </div>
        </article>
        <article v-if="downloadInformation.foss.asset" class="release-card foss">
          <div class="foss-copy">
            <span class="foss-icon" aria-hidden="true"><IconLeaf /></span>
            <div>
              <h3>FOSS</h3>
              <p class="foss-description">
                A fully FOSS-compliant build of Mihon, compiled from the publicly available source code.
              </p>
              <p class="foss-note">
                <IconInformationOutline aria-hidden="true" />
                <span><strong>Note:</strong> Features that rely on proprietary components or commercial services are excluded.</span>
              </p>
            </div>
          </div>
          <a
            class="download-button tertiary"
            :download="downloadInformation.foss.asset.name"
            :href="downloadInformation.foss.asset.browser_download_url"
            @click="handleAnalytics('foss')"
          >
            <IconDownload />
            <span class="text">Mihon FOSS</span>
            <span class="version">{{ downloadInformation.foss.tagName }}</span>
          </a>
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
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 1.5rem

  &.stable-only {
    grid-template-columns: 1fr

    .release-card.stable {
      display: grid
      grid-template-columns: minmax(13rem, 0.9fr) minmax(17rem, 1fr) minmax(14rem, auto)
      grid-template-rows: auto auto
      align-items: center
      column-gap: 1.5rem
      padding: 1rem 1.25rem

      .release-card-header {
        grid-column: 1
        grid-row: 1
        padding-bottom: 0
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
        grid-column: 1 / span 2
        grid-row: 2
        margin: 0.5rem 0 0
      }
    }
  }
}

.release-card {
  display: flex
  min-width: 0
  flex-direction: column
  border: 1px solid var(--vp-c-divider)
  border-radius: 14px
  padding: 1.5rem
  background: var(--vp-c-bg-soft)

  &.stable {
    border-color: var(--vp-c-brand-border)
    background: linear-gradient(135deg, rgba(78, 103, 205, 0.25), rgba(43, 57, 128, 0.18))
    box-shadow: 0 12px 32px rgba(45, 59, 137, 0.18)
  }

  &.beta {
    border-color: #514328
    background: linear-gradient(135deg, rgba(171, 132, 36, 0.16), rgba(105, 78, 21, 0.11))
  }

  &.foss {
    border-color: #35453f
    background: linear-gradient(135deg, rgba(63, 132, 77, 0.12), rgba(35, 88, 47, 0.09))
  }
}

html:not(.dark) {
  .release-card {
    border-color: #d8d8df
    background: #f5f5f7
    box-shadow: 0 1px 2px rgba(31, 35, 45, 0.08)

    &.stable {
      border-color: var(--vp-c-brand-border)
      background: linear-gradient(135deg, #dce1ff, #eef0ff)
      box-shadow: 0 8px 24px rgba(88, 101, 190, 0.16)
    }

    &.beta {
      border-color: #d5c9a1
      background: linear-gradient(135deg, #fff2c9, #fffaf0)
    }

    &.foss {
      border-color: #c7dbc3
      background: linear-gradient(135deg, #e3f3e0, #f5fbf3)
    }
  }

  .release-card.stable .release-icon {
    color: #34437e
    background: #bfc9ff
  }

  .release-card:not(.stable) .release-icon {
    color: #4b4f5c
    background: #d9dbe2
  }

  .release-card.stable .release-details svg {
    color: #405091
    background: #cbd3ff
  }

  .release-card:not(.stable) .release-details svg {
    color: #555a68
    background: #dfe1e7
  }

  .release-card.beta .release-icon {
    color: #765d09
    background: #f4e2a5
  }

  .release-card.beta .release-details svg {
    color: #806510
    background: #faedc4
  }

  .release-card.beta .download-button.secondary {
    color: #604900
    background-color: #f5df95

    &:hover {
      color: #4d3a00
      background-color: #edcf6d
    }

    &:active {
      color: #413100
      background-color: #e4bf50
    }
  }

  .release-card.foss .download-button.tertiary {
    color: #365f32
    background-color: #dcefd8

    &:hover {
      color: #294b26
      background-color: #cbe6c6
    }

    &:active {
      color: #203d1e
      background-color: #bcdbb6
    }
  }

  .foss-icon {
    color: #4f6a42
    background: #dce9d7
  }
}

.release-card-header {
  display: flex
  align-items: center
  gap: 1rem
  padding-bottom: 0.75rem

  h3 {
    margin: 0
    font-size: 1.5rem
  }

  p {
    margin: 0.15rem 0 0
    color: var(--vp-c-text-2)
    font-size: 1rem
  }
}

.release-icon {
  display: grid
  width: 4rem
  height: 4rem
  flex: 0 0 auto
  place-items: center
  border-radius: 50%
  color: var(--vp-c-text-1)
  background: var(--vp-c-default-soft)

  svg {
    font-size: 2rem
  }

  .mihon-logo {
    width: 2.25rem
    height: 2.25rem
    background: currentColor
    mask: url('/img/mihon.svg') center / contain no-repeat
  }

  .stable & {
    color: #dce4ff
    background: rgba(88, 112, 223, 0.35)
  }
}

.release-details {
  display: grid
  gap: 0.5rem
  margin: 0.75rem 0

  div {
    display: flex
    align-items: center
    gap: 0.75rem
  }

  .release-detail-copy {
    display: inline-flex
    align-items: baseline
    gap: 0.5rem
    min-width: 0
  }

  svg {
    width: 2rem
    height: 2rem
    flex: 0 0 auto
    padding: 0.5rem
    border-radius: 50%
    color: var(--vp-c-text-2)
    background: var(--vp-c-default-soft)

    .stable & {
      color: var(--vp-c-brand-darker)
      background: var(--vp-c-brand-dimm)
    }

    .dark .stable & {
      color: #bfceff
      background: rgba(88, 112, 223, 0.35)
    }
  }

  dt,
  dd {
    margin: 0
    font-size: 1rem
  }

  dt {
    color: var(--vp-c-text-2)
  }

  dd {
    color: var(--vp-c-text-1)
    font-weight: 600
  }
}

.release-card.foss {
  grid-column: 1 / -1
  display: flex
  align-items: center
  flex-direction: row
  gap: 1.25rem
  padding: 1rem 1.25rem

  .download-button {
    width: auto
    min-width: 13.5rem
    flex: 0 0 auto
  }
}

.foss-copy {
  display: flex
  align-items: center
  gap: 0.85rem
  flex: 1 1 auto
  min-width: 0

  h3,
  p {
    margin: 0
  }

  h3 {
    font-size: 1rem
  }

  .foss-description {
    margin-top: 0.15rem
    color: var(--vp-c-text-2)
    font-size: 0.85rem
    line-height: 1.45
  }
}

.foss-note {
  margin-top: 0.55rem !important
  color: var(--vp-c-text-2)
  font-size: 0.78rem
  font-style: italic
  line-height: 1.4

  svg {
    display: inline-block
    margin-right: 0.4rem
    color: #8bbd91
    font-size: 1rem
    vertical-align: -0.15em
  }
}

.foss-icon {
  display: grid
  width: 2.75rem
  height: 2.75rem
  flex: 0 0 auto
  place-items: center
  border-radius: 50%
  color: var(--vp-c-text-2)
  background: var(--vp-c-default-soft)

  svg {
    font-size: 1.35rem
  }
}

.release-action-note {
  display: flex
  align-items: flex-start
  gap: 0.5rem
  margin: 0.75rem 0 0
  color: var(--vp-c-text-2)
  font-size: 0.9rem
  line-height: 1.5

  svg {
    margin-top: 0.1rem
    flex: 0 0 auto
    font-size: 1.2rem
  }
}

.release-actions {
  margin-top: auto
  padding-top: 0.75rem
}

.download-button {
  display: block
  width: 100%
  text-align: center
  font-weight: 600
  white-space: nowrap
  cursor: pointer
  transition: color 0.25s, border-color 0.25s, background-color 0.25s
  border-radius: 9px
  padding: 0 16px
  line-height: 3.75rem
  font-size: 1rem

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

    &:active {
      color: var(--vp-button-brand-active-text)
      background-color: var(--vp-button-brand-active-bg)
    }
  }

  &.secondary {
    color: var(--vp-button-alt-text)
    background-color: var(--vp-button-alt-bg)

    &:hover {
      color: var(--vp-button-alt-hover-text)
      background-color: var(--vp-button-alt-hover-bg)
    }

    &:active {
      color: var(--vp-button-alt-active-text)
      background-color: var(--vp-button-alt-active-bg)
    }
  }

  .release-card.beta &.secondary {
    color: #fff1c7
    background-color: #765d19

    &:hover {
      color: #fff7de
      background-color: #8b701e
    }

    &:active {
      color: #fff7de
      background-color: #9c7e22
    }
  }

  &.tertiary {
    color: var(--vp-c-text-1)
    background-color: var(--vp-c-bg-soft)

    &:hover {
      background-color: var(--vp-c-default-soft)
    }

    &:active {
      background-color: var(--vp-c-divider)
    }
  }

  .release-card.foss &.tertiary {
    color: #d9f0d3
    background-color: #345d3c

    &:hover {
      color: #ecfae8
      background-color: #407348
    }

    &:active {
      color: #ecfae8
      background-color: #4d8656
    }
  }

  svg {
    display: inline-block
    vertical-align: middle
    margin-right: 0.5em
    font-size: 1.25em
  }

  .text {
    margin-right: 0.5rem
  }

  .version {
    font-size: 0.8em
  }
}

@media (max-width 960px) {
  .release-cards.stable-only .release-card.stable {
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
      margin: 0.5rem 0 0
    }

    .download-button {
      grid-column: 2
      grid-row: 1 / span 2
      min-width: 15rem
    }

    .release-action-note {
      grid-column: 1
      grid-row: 3
    }
  }
}

@media (max-width 640px) {
  .release-cards {
    grid-template-columns: 1fr
  }

  .release-card {
    padding: 1.25rem
  }

  .release-cards.stable-only .release-card.stable {
    display: flex
    align-items: stretch
    flex-direction: column
    padding: 1.25rem

    .release-card-header,
    .release-details,
    .release-action-note {
      grid-column: auto
    }

    .release-card-header {
      padding-bottom: 0.75rem
    }

    .release-details {
      grid-template-columns: 1fr
      margin: 0.75rem 0
    }

    .release-actions {
      display: block
    }

    .download-button {
      width: 100%
      min-width: 0
      line-height: 3.75rem
    }

    .release-action-note {
      margin: 0.75rem 0 0
    }
  }

  .release-card.foss {
    align-items: flex-start
    flex-direction: column

    .download-button {
      width: 100%
      min-width: 0
    }
  }
}
</style>
