import type { Release } from '../../config/releaseData'
import { defineLoader } from 'vitepress'
import { getReleaseData } from '../../config/releaseData'

export interface AppRelease {
  stable: Release
  beta: Release
}

declare const data: AppRelease
export { data }

export default defineLoader({
  async load(): Promise<AppRelease> {
    const { stableLatest: stable, betaLatest: beta } = await getReleaseData()
    return { stable, beta }
  },
})
