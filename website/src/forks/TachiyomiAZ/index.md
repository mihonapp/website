---
title: TachiyomiAZ
titleTemplate: false
description: Legacy support with backported features

layout: home
pageClass: page-tachiyomi-az

hero:
  name: TachiyomiAZ
  text: Classic UI
  tagline: Android 5+ support, Backported features, and Reliable updates
  image: /forks/logo-az.webp
  actions:
    - theme: brand
      text: Download
      link: https://github.com/az4521/TachiyomiAZ/releases/latest
    - theme: alt
      text: GitHub
      link: https://github.com/az4521/tachiyomiAZ
    - theme: alt
      text: Dev Build
      link: https://crafty.moe/tachiyomiAZ.apk

customMetaTitle: TachiyomiAZ

features:
  - title: Series recommendations
    details: Get recommendations from Anilist and MyAnimeList.
    icon: 📚
  - title: Classic material design
    details: Keeps the old design of Tachiyomi with hamburger menu.
    icon: 🍔
  - title: SadPanda Support
    details: Forked from TachiyomiEH, supports E-Hentai/Ex-Hentai logins.
    icon: 🔞

theme: "#FFCC4D"
image: /forks/logo-az.webp
imageSize: small
---

<br><VPTeamMembers size="small" :members="members" />

<script setup>
import "@theme/styles/forks/tachiyomi-az.styl"
import { VPTeamMembers } from "vitepress/theme"

const members = [
  {
    avatar: "https://www.github.com/az4521.png",
    name: "az4521",
    title: "Creator",
    links: [
      { icon: "github", link: "https://github.com/az4521" }
    ]
  },
  {
    avatar: "https://www.github.com/KraXen72.png",
    name: "KraXen72",
    title: "Occasional Maintainer",
    links: [
      { icon: "github", link: "https://github.com/KraXen72" }
    ]
  },
  {
    avatar: "https://www.github.com/jobobby04.png",
    name: "jobobby04",
    title: "Former Maintainer",
    links: [
      { icon: "github", link: "https://github.com/jobobby04" }
    ]
  },
  {
    avatar: "https://www.github.com/NerdNumber9.png",
    name: "NerdNumber9",
    title: "Original EH Fork",
    links: [
      { icon: "github", link: "https://github.com/NerdNumber9" }
    ]
  }
]
</script>

<br>

<div class="azContainer">
  <div class="azMarquee">
    <div class="azWiggleText">
      <span class="azText"><i>"The BEST fork"</i> - az4521</span>
    </div>
  </div>
</div>
