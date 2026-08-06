<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ value: string }>()
const locale = ref('en-GB')

onMounted(() => {
  locale.value = navigator.language
})

const date = computed(() => new Date(props.value))
const includesTime = computed(() => props.value.includes('T'))

const formattedDate = computed(() => new Intl.DateTimeFormat(locale.value, {
  dateStyle: 'medium',
  timeZone: 'UTC',
}).format(date.value))

const exactDateOptions = computed<Intl.DateTimeFormatOptions>(() => includesTime.value
  ? {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'UTC',
    }
  : {
      dateStyle: 'full',
      timeZone: 'UTC',
    })

const exactDate = computed(() => new Intl.DateTimeFormat(locale.value, exactDateOptions.value).format(date.value))
</script>

<template>
  <time :datetime="value" :title="exactDate">{{ formattedDate }}</time>
</template>
