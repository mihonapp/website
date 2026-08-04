import { getStableReleases } from '../.vitepress/config/releaseData'

export default {
  async paths() {
    const releases = await getStableReleases()

    return releases
      .filter(r => !!r.tag_name)
      .map(r => ({ params: { tag: r.tag_name } }))
  },
}
