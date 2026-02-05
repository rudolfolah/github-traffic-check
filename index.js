const { Octokit } = require("@octokit/rest");

const DEBUG_LOG = process.env.DEBUG_LOG === "1";

if (!process.env.GITHUB_AUTH_TOKEN) {
  throw new Error("Environment variable GITHUB_AUTH_TOKEN is not set");
}

const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

async function fetchRepoData() {
  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, { per_page: 100 });
  return repos;
}

async function fetchTrafficData(owner, name) {
  const traffic = await octokit.repos.getViews({ owner, repo: name });
  return traffic.data;
}

async function main() {
  const repos = await fetchRepoData();
  console.log('repo_name,stars,views,uniques');
  for (let repo of repos) {
    if (repo.private) {
      if (DEBUG_LOG) {
        console.error(`Skipping private repo: ${repo.full_name}`);
      }
      continue;
    }
    const traffic = await fetchTrafficData(repo.owner.login, repo.name);
    console.log(`${repo.full_name},${repo.stargazers_count},${traffic.count},${traffic.uniques}`)
  }
}

main().catch(err => console.error(err));
