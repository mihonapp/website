// Import icon components
import { IconBugReport, IconDownload, IconNewspaperVariant } from '@iconify-prerendered/vue-mdi'

import { VueQueryPlugin } from '@tanstack/vue-query'

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'

import Layout from './Layout.vue'

import analytics from './plugin/analytics'

// Import Stylus files
import './styles/base.styl'
// Import Global plugins
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueQueryPlugin)
    enhanceAppWithTabs(app)
    app.component('IconDownload', IconDownload)
    app.component('IconNewspaperVariant', IconNewspaperVariant)
    app.component('IconBugReport', IconBugReport)
    analytics({ id: 'G-KN9GHR5EKT' })
  },
  Layout,
}
