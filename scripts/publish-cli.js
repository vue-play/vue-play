const spawn = require('child_process').spawnSync

const version = process.argv[2] || 'patch'

const test = exec('yarn', ['run', 'test'])
check(test)

const bump = exec('yarn', ['version', '--new-version', version])
check(bump)

const publish = exec('yarn', ['publish'])
check(publish)

const pkg = require('../packages/vue-play-cli/package.json')
const commit = exec('git', ['commit', '-am', `bump vue-play-cli -> ${pkg.version}`], './')
check(commit)

const push = exec('git', ['push'], './')
check(push)

function check(cmd) {
  if (cmd.status !== 0) {
    process.exit(cmd.status)
  }
}

function exec(cmd, args, cwd) {
  return spawn(cmd, args, {
    cwd: cwd || './packages/vue-play-cli',
    stdio: 'inherit'}
  )
}
