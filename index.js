require('dotenv').config();
const { Octokit } = require("@octokit/rest");

async function main() {
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });
  const reposResponse = await octokit.repos.listForAuthenticatedUser({
    per_page: 100,
  });
  console.log('repo_name,stars,views,uniques');
  for (let repo of reposResponse.data) {
    if (repo.private) {
      continue;
    }
    const trafficResponse = await octokit.repos.getViews({
      owner: repo.owner.login,
      repo: repo.name
    });
    console.log(`${repo.full_name},${repo.stargazers_count},${trafficResponse.data.count},${trafficResponse.data.uniques}`)
  }
}

main();
