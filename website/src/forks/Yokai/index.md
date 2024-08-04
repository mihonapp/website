---
title: Yokai
titleTemplate: false
description: Takes the best from J2K and enhances it

layout: home
pageClass: page-tachiyomi-yokai

hero:
  name: Yōkai
  text: Redesigned
  tagline: Takes the best from J2K and enhances it
  image: /forks/logo-yokai.webp
  actions:
    - theme: brand
      text: Download
      link: https://github.com/null2264/yokai/releases/latest
    - theme: alt
      text: GitHub
      link: https://github.com/null2264/yokai

customMetaTitle: Yokai

features:
  - title: Redesigned UI
    details: Entirely different design from regular Tachiyomi, with exciting new features.
    icon: 👑
  - title: Double-page for Tablets
    details: Combine 2 pages while reading into a single one for a better tablet experience.
    icon: 📖
  - title: Dynamic categories
    details: Group your library automatically by the tags, tracking status, source, and more.
    icon: 🔖
  - title: SFW filter
    details: Filter SFW/NSFW content from your library and sources.
    icon: 🔞

theme: "#30bbf8"
image: /forks/logo-yokai.webp
imageSize: small
---

<br><VPTeamMembers size="small" :members="members" />

<script setup>
import "@theme/styles/forks/tachiyomi-yokai.styl"
import { VPTeamMembers } from "vitepress/theme"

const members = [
  {
    avatar: "https://www.github.com/null2264.png",
    name: "null2264",
    title: "Creator",
    links: [
      { icon: "github", link: "https://github.com/null2264" }
    ]
  },
  {
    avatar: "https://www.github.com/Jays2Kings.png",
    name: "Jays2Kings",
    title: "Original J2K Fork",
    links: [
      { icon: "github", link: "https://github.com/Jays2Kings" }
    ]
  }
]
</script>
