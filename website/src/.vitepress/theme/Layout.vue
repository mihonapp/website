<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, provide } from 'vue'
import LatestStableRelease from './components/LatestStableRelease.vue'

const { frontmatter, isDark } = useData()
const route = useRoute()
const isHomePage = computed(() => frontmatter.value.layout === 'home' && route.path === '/')

provide('toggle-appearance', () => {
  isDark.value = !isDark.value
})
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="isHomePage" #home-hero-actions-after>
      <LatestStableRelease />
    </template>
  </DefaultTheme.Layout>
</template>
