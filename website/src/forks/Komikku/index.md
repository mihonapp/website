---
title: Komikku
titleTemplate: false
description: A fork with features from Sy and Mihon plus added personal flair.

layout: home
pageClass: page-komikku

hero:
  name: Komikku
  text: Feature-packed
  tagline: A fork with features from Sy and Mihon plus added personal flair.
  image: /forks/logo-komikku.webp
  actions:
    - theme: brand
      text: Download
      link: https://github.com/komikku-app/komikku/releases/latest
    - theme: alt
      text: GitHub
      link: https://github.com/komikku-app/komikku
    - theme: alt
      text: Preview
      link: https://github.com/komikku-app/komikku-preview/releases/latest

customMetaTitle: Komikku

features:
  - title: Website Suggestions
    details: Show suggestions and recommendations for the current entry from its own website, supports all sources.
    icon: 📚
  - title: Fast Browsing
    details: Super fast Browsing and Global Search (for whom with large database experiencing slow loading).
    icon: 🏎️
  - title: Hidden Categories
    details: Hides your <b>things</b> from <i>nosy</i> people.
    icon: 🕵🏻‍♂️
  - title: Custom Theme
    details: Unleash your creativity with a fully customizable theme (also comes with colorful presets) for endless color lovers.
    icon: 🌈

theme: "#FF5555"
image: /forks/logo-komikku.webp
imageSize: small
---

<br><VPTeamMembers size="small" :members="members" />

<script setup>
import "@theme/styles/forks/komikku.styl"
import { VPTeamMembers } from "vitepress/theme"

const members = [
  {
    avatar: "https://www.github.com/cuong-tran.png",
    name: "cuong-tran",
    title: "Creator",
    links: [
      { icon: "github", link: "https://github.com/cuong-tran" }
    ]
  },
  {
    avatar: "https://www.github.com/AntsyLich.png",
    name: "AntsyLich",
    title: "Upstream Maintainer",
    links: [
      { icon: "github", link: "https://github.com/AntsyLich" }
    ]
  },
  {
    avatar: "https://www.github.com/jobobby04.png",
    name: "jobobby04",
    title: "Upstream Maintainer",
    links: [
      { icon: "github", link: "https://github.com/jobobby04" }
    ]
  }
]
</script>
