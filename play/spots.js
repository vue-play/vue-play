import play from '../src/play'

play('Button', module)
  .add('with text', `<button @click="$log('text')">text</button>`)
  .add('with emoji', `<button @click="$log('😅')">🤔</button>`)
  .add('colorful', {
    render(h) {
      return h('button', {
        style: {backgroundColor: 'pink'}
      }, ['hello world'])
    }
  })
