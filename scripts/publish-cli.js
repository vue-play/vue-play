const spawn = require('child_process').spawnSync

const version = process.argv.slice(2, 1) || 'patch'

const test = exec('npm', ['test'])
check(test)

const bump = exec('npm', ['version', version])
check(bump)

const publish = exec('npm', ['publish'])
check(publish)

const push = exec('git', ['push'])
check(push)

function test(cmd) {
  if (cmd.status !== 0) {
    process.exit(res.status)
  }
}

function exec(cmd, args) {
  return spawn(cmd, args, {cwd: './packages/vue-play-cli', stdio: 'inherit'})
}
