<script setup lang="ts">
import { DateTime } from 'luxon'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ value: string }>()
const locale = ref('en-GB')

onMounted(() => {
  locale.value = navigator.language
})

const date = computed(() => DateTime.fromISO(props.value, { zone: 'utc' }).setLocale(locale.value))
const includesTime = computed(() => props.value.includes('T'))

const formattedDate = computed(() => date.value.toLocaleString(DateTime.DATE_MED))

const exactDate = computed(() => date.value.toLocaleString(includesTime.value ? DateTime.DATETIME_FULL : DateTime.DATE_FULL))
</script>

<template>
  <time :datetime="value" :title="exactDate">{{ formattedDate }}</time>
</template>
