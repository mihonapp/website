<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ value: string }>()
const locale = ref('en-GB')

onMounted(() => {
  locale.value = navigator.language
})

const formattedDate = computed(() => new Intl.DateTimeFormat(locale.value, {
  dateStyle: 'medium',
  timeZone: 'UTC',
}).format(new Date(props.value)))
</script>

<template>
  <time :datetime="value">{{ formattedDate }}</time>
</template>
