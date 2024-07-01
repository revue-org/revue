const config = require('semantic-release-preconfigured-conventional-commits')
config.plugins.push(
  [
    '@semantic-release/exec', {
      publishCmd: 'echo "not releasing yet" /' +
          'cat CHANGELOG.md /'
  }],
  '@semantic-release/github',
  '@semantic-release/git'
)

module.exports = config
