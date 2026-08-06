<script setup lang="ts">
import type { AppRelease } from '../data/release.data'
import { computed, onMounted, ref, toRefs } from 'vue'
import { data as release } from '../data/release.data'

const props = defineProps<{ type: keyof AppRelease }>()
const { type } = toRefs(props)
const locale = ref('en-GB')

const relativeUnits: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 365.25 * 24 * 60 * 60 * 1000],
  ['month', 30.44 * 24 * 60 * 60 * 1000],
  ['week', 7 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
  ['second', 1000],
]

function formatRelativeDate(date: Date): string {
  const difference = date.getTime() - Date.now()
  const [unit, milliseconds] = relativeUnits.find(([, value]) => Math.abs(difference) >= value) ?? relativeUnits.at(-1)!
  return new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
    .format(Math.round(difference / milliseconds), unit)
}

const releaseDate = computed(() => {
  const iso = release[type.value].published_at ?? undefined
  const date = new Date(iso ?? '')
  const formatter = new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  })
  return {
    exact: Number.isNaN(date.getTime()) ? undefined : formatter.format(date),
    iso,
    relative: Number.isNaN(date.getTime()) ? undefined : formatRelativeDate(date),
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
