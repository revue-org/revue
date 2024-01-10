const config = require('semantic-release-preconfigured-conventional-commits')
// this already includes:
// - semantic-release/commit-analyzer
// - semantic-release/release-notes-generator
config.plugins.push(
  // [
  //   '@semantic-release/exec',
  //   {
  //     prepareCmd: './update-version.sh ${nextRelease.version}'
  //   }
  // ],
  "@semantic-release/changelog",
  '@semantic-release/github',
  '@semantic-release/git',
)

module.exports = config
