const config = require('semantic-release-preconfigured-conventional-commits')
config.plugins.push(
  // [
  //   '@semantic-release/exec',
  //   {
  //     prepareCmd: './update-version.sh ${nextRelease.version}'
  //   }
  // ],
  '@semantic-release/github',
  '@semantic-release/git'
)

module.exports = config
