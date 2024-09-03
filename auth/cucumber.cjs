var common = [
    `--format ${
        process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
    }`,
    '--parallel 20',
    '--import ./dist/test/features/support/*.js'
].join(' ');

module.exports = {
    default: common,
};