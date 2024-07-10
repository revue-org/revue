import config from 'semantic-release-preconfigured-conventional-commits' assert { type: "json" };

config.preset = 'conventionalcommits';
config.tagFormat = 'v${version}';
config.plugins.push(
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
  "@semantic-release/changelog",
  "@semantic-release/github",
  "@semantic-release/git"
);

export default config;
