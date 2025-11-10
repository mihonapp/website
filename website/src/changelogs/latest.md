---
title: Latest Changelog
description: Changelog of the latest version of Mihon.
outline: false
lastUpdated: false
editLink: false
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { Octokit } from '@octokit/rest'

const router = useRouter()

onMounted(async () => {
  try {
    const octokit = new Octokit()
    const { data } = await octokit.repos.listReleases({
      owner: 'mihonapp',
      repo: 'mihon',
      per_page: 1,
    })

    if (data && data.length > 0 && data[0].tag_name) {
      const latestTag = data[0].tag_name
      router.go(`/changelogs/${latestTag}`)
    } else {
      // Fallback to changelogs index if no releases found
      router.go('/changelogs')
    }
  } catch (error) {
    console.error('Failed to fetch latest release:', error)
    // Fallback to changelogs index on error
    router.go('/changelogs')
  }
})
</script>

<div style="text-align: center; padding: 2rem;">
  <p>Redirecting to the latest changelog...</p>
</div>
