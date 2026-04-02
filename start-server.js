#!/usr/bin/env node
const { spawn } = require('child_process')
const path = require('path')

const nodeBin = '/Users/azizhariz/.nvm/versions/node/v24.14.1/bin'
const env = {
  ...process.env,
  PATH: nodeBin + ':/tmp:/usr/local/bin:/usr/bin:/bin',
}

const next = path.join(__dirname, 'node_modules/next/dist/bin/next')
const child = spawn(process.execPath, [next, 'dev', '--webpack'], {
  cwd: __dirname,
  env,
  stdio: 'inherit',
})

child.on('exit', (code) => process.exit(code ?? 0))
