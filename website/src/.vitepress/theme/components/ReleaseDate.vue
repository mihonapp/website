<script setup lang="ts">
import type { AppRelease } from '../data/release.data'
import { DateTime } from 'luxon'
import { computed, onMounted, ref, toRefs } from 'vue'
import { data as release } from '../data/release.data'

const props = defineProps<{ type: keyof AppRelease }>()
const { type } = toRefs(props)
const locale = ref('en-GB')

const releaseDate = computed(() => {
  const iso = release[type.value].published_at ?? undefined
  const date = DateTime.fromISO(iso ?? '', { zone: 'utc' }).setLocale(locale.value)
  return {
    exact: date.isValid ? date.toLocaleString(DateTime.DATETIME_FULL) : undefined,
    iso,
    relative: date.isValid ? date.toRelative() ?? undefined : undefined,
  }
})

// Mimic the <ClientOnly /> behavior to show custom text while rendering.
const show = ref(false)

onMounted(() => {
  locale.value = navigator.language
  show.value = true
})
</script>

<template>
  <time v-if="show" :datetime="releaseDate.iso" :title="releaseDate.exact">
    {{ releaseDate.relative }}
  </time>
  <time v-else :datetime="releaseDate.iso">
    {{ releaseDate.exact }}
  </time>
</template>
