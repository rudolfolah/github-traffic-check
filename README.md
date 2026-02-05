# GitHub Traffic Check
Prints out all traffic insights for GitHub repositories that you have access to

[Licensed under MIT license](./LICENSE)

## Usage

Install:

```shell
nvm install
nvm use
npm install
```

[Create a personal web access token](https://github.com/settings/tokens/new), with `repo` scope:

```shell
# On MacOS store it in the keychain
security add-generic-password -a "$USER" -s 'github-traffic-check-token' -w
```

Run the program:

```shell
# MacOS
GITHUB_AUTH_TOKEN=$(security find-generic-password -a "$USER" -s 'github-traffic-check-token' -w) npm start
```

### Example output

```
rudolfo@macbook github-traffic-check % node index.js
repo_name,stars,views,uniques
rudolfolah/ansible-role-letsencryptssl,2,7,2
rudolfolah/ansible-role-mongodb,1,0,0
rudolfolah/ansible-role-nodejs,1,0,0
rudolfolah/aws-terraform-generator,1,21,2
rudolfolah/benchmark-routers-for-react,1,19,1
...
rudolfolah/secure_django_code_exercise_files_05_02_end,1,19,3
rudolfolah/talk,0,2,1
rudolfolah/tweet-writer,2,4,2
rudolfolah/webpack.js.org,1,0,0
rudolfolah/YamlDotNet,0,2,1
```
