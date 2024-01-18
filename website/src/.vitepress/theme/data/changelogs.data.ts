import { defineLoader } from 'vitepress'
import { Octokit } from '@octokit/rest'
import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'

const octokit = new Octokit()

type GitHubReleaseList = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.listReleases>

declare const data: GitHubReleaseList
export { data }

export default defineLoader({
  async load(): Promise<GitHubReleaseList> {
    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: 'mihonapp',
      repo: 'mihon',
      per_page: 100,
    })

    return releases
  },
})
