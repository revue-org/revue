const config = require('semantic-release-preconfigured-conventional-commits')
config.plugins.push(
  '@semantic-release/commit-analyzer',
  '@semantic-release/github',
  '@semantic-release/git',
  [
    '@semantic-release/changelog',
    {
      changelogFile: 'CHANGELOG.md'
    }
  ],
  [
    '@semantic-release/exec',
    {
      prepareCmd: './update-version.sh ${nextRelease.version}'
    }
  ]
)

module.exports = config
