import config from 'semantic-release-preconfigured-conventional-commits' assert { type: "json" };
const publishCmd = `
echo "not releasing yet";
cat CHANGELOG.md'
`;
config.plugins.push(
  [
    '@semantic-release/exec', {
      publishCmd: publishCmd
  }],
  '@semantic-release/github',
  '@semantic-release/git'
);

export default config;
