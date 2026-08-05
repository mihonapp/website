import type { Release } from '../../config/releaseData'
import { defineLoader } from 'vitepress'
import { getStableReleases } from '../../config/releaseData'

type GitHubReleaseList = Release[]

declare const data: GitHubReleaseList
export { data }

export default defineLoader({
  async load(): Promise<GitHubReleaseList> {
    return getStableReleases()
  },
})
