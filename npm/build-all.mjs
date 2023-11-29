#!/usr/bin/env node
/* eslint-env node */

import { spawn } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';
import { cpus } from 'node:os';

const nodeProjectDir = fileURLToPath(new URL('.', import.meta.url));

const targets = ['index', 'inline'].flatMap((target) => [
  `dist/${target}.d.ts`,
  `dist/${target}.mjs`,
  `dist/${target}.js`,
]);

async function buildTarget(target) {
  return new Promise((resolve) => {
    const buildProcess = spawn('pnpm', ['run', 'build:rollup'], {
      cwd: nodeProjectDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        FILTER_BY_OUTPUT: target,
      },
    });
    buildProcess.on('exit', resolve);
  });
}

async function createThread() {
  let target;
  while ((target = targets.shift())) {
    await buildTarget(target);
  }
}

async function main() {
  const threads = [];
  const threadCount = Math.min(cpus().length - 1, targets.length);
  for (let i = 0; i < threadCount; i++) {
    threads.push(createThread());
  }
  await Promise.all(threads);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
