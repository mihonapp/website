import { Octokit } from '@octokit/rest'

export default {
  async paths() {
    const octokit = new Octokit()
    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: 'mihonapp',
      repo: 'mihon',
      per_page: 100,
    })

    return releases
      .filter(r => !!r.tag_name)
      .map(r => ({ params: { tag: r.tag_name } }))
  },
}
