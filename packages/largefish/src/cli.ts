import { utils } from 'umi';
import { fork } from 'child_process';

const { yParser, chalk } = utils;

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
  },
  boolean: ['version'],
});

process.env.UMI_PRESETS = require.resolve('@largefish/preset-largefish');

// --version
const { name, version } = require('../package');
if (args.version && !args._.length) {
  console.log(`${name}@${version}`);
} else {
  const umiVersion = require('umi/package').version;
  console.log(
    `🐟🐟🐟 Using ${name}@${version} and umi@${umiVersion}... 🐟🐟🐟`,
  );
}

// exec umi
const child = fork(require.resolve('umi/bin/umi'), process.argv.slice(2), {
  stdio: 'inherit',
});


child.on('exit', (code, signal) => {
  if (signal === 'SIGABRT') {
    process.exit(1);
  }
  process.exit(code || 0);
})

process.on('SIGINT', () => {
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});
