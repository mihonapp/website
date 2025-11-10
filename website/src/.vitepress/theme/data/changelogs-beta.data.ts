import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { Octokit } from '@octokit/rest'
import { defineLoader } from 'vitepress'

const octokit = new Octokit()

type GitHubReleaseList = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.listReleases>

declare const data: GitHubReleaseList
export { data }

export default defineLoader({
  async load(): Promise<GitHubReleaseList> {
    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: 'mihonapp',
      repo: 'mihon-preview',
      per_page: 100,
    })

    return releases
  },
})
