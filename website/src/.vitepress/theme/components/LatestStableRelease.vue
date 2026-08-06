<script setup lang="ts">
import { IconDownload, IconNewspaperVariant } from '@iconify-prerendered/vue-mdi'
import { data as stableRelease } from '../data/latestStableRelease.data'
import LocalizedDate from './LocalizedDate.vue'
</script>

<template>
  <aside class="latest-stable-release" aria-label="Latest stable release">
    <div class="release-summary">
      <span class="release-kicker">Latest stable release</span>
      <strong>{{ stableRelease.name }}</strong>
      <span v-if="stableRelease.publishedAt" class="release-date">
        Released <LocalizedDate :value="stableRelease.publishedAt" />
      </span>
    </div>

    <div class="latest-release-actions">
      <a class="changelog-link" :href="`/changelogs/${stableRelease.tagName}`">
        <IconNewspaperVariant aria-hidden="true" />
        Changelog
      </a>
      <a class="download-link" href="/download/">
        <IconDownload aria-hidden="true" />
        Download
      </a>
    </div>
  </aside>
</template>

<style lang="stylus" scoped>
.latest-stable-release {
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: 0.8rem 1.25rem
  width: fit-content
  max-width: 100%
  margin-top: 1.5rem
  padding: 0.8rem 0.9rem 0.8rem 1rem
  border: 1px solid var(--vp-c-brand)
  border-radius: 12px
  background: var(--vp-c-brand-dimm)
  box-shadow: 0 8px 24px var(--vp-c-brand-dimm)
}

.release-summary {
  display: grid
  gap: 0.1rem
  min-width: 11rem

  strong {
    color: var(--vp-c-text-1)
    font-size: 0.96rem
  }
}

.release-kicker,
.release-date {
  color: var(--vp-c-text-2)
  font-size: 0.78rem
}

.latest-release-actions {
  display: flex
  align-items: center
  gap: 0.7rem
}

.download-link {
  display: inline-flex
  align-items: center
  gap: 0.4rem
  min-height: 2.3rem
  padding: 0 0.85rem
  border-radius: 8px
  background: var(--vp-c-brand-darker)
  color: var(--vp-button-brand-text)
  font-size: 0.84rem
  font-weight: 600
  text-decoration: none
  transition: background-color 0.2s, transform 0.2s

  &:hover {
    background: var(--vp-c-brand-dark)
    color: var(--vp-button-brand-text)
    transform: translateY(-1px)
  }

  svg {
    font-size: 1rem
  }
}

.changelog-link {
  display: inline-flex
  align-items: center
  gap: 0.35rem
  color: var(--vp-c-text-2)
  font-size: 0.82rem
  text-decoration: none

  &:hover {
    color: var(--vp-c-brand-1)
  }

  svg {
    font-size: 1rem
  }
}

@media (max-width 640px) {
  .latest-stable-release {
    width: 100%
    align-items: stretch
  }

  .latest-release-actions {
    justify-content: space-between
  }
}
</style>
