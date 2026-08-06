import { defineLoader } from 'vitepress'
import { getReleaseData } from '../../config/releaseData'

export interface LatestStableRelease {
  name: string
  publishedAt?: string
  tagName: string
}

declare const data: LatestStableRelease
export { data }

export default defineLoader({
  async load(): Promise<LatestStableRelease> {
    const { stableLatest } = await getReleaseData()

    return {
      name: stableLatest.name ?? `Mihon ${stableLatest.tag_name}`,
      publishedAt: stableLatest.published_at ?? undefined,
      tagName: stableLatest.tag_name,
    }
  },
})
