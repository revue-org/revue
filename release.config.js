const config = require('semantic-release-preconfigured-conventional-commits')
const publishCmd = `
echo "not releasing yet";
cat CHANGELOG.md'
`
config.plugins.push(
  [
    '@semantic-release/exec', {
      publishCmd: publishCmd
  }],
  '@semantic-release/github',
  '@semantic-release/git'
)

module.exports = config
