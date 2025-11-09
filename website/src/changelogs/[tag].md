---
# This is a dynamic route template. Title/description can be generic; content uses params.
outline: false
lastUpdated: false
editLink: false
prev:
  text: 'Changelogs'
  link: '/changelogs'
next:
  text: 'Download'
  link: '/download'
---

<script setup lang="ts">
import { useData } from 'vitepress'
import ChangelogByTag from "@theme/components/ChangelogByTag.vue";

const { page } = useData()
const tag = page.value.params.tag as string
</script>

<ChangelogByTag :tag="tag" />
