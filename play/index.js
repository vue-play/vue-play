import play from '../src/play'
import MyButton from './MyButton.vue'

module.exports.components = {
  MyButton
}

play('Button', module)
  .add('with text', {
    template: `<my-button :handle-click="log">text</my-button>`,
    methods: {
      log() {
        this.$log(new Date())
      }
    }
  })
  .add('with emoji', `<my-button>🤔</my-button>`)
  .add('colorful', {
    render(h) {
      return h(MyButton, {
        props: {color: 'pink'}
      }, ['hello world'])
    }
  })
  .add('rounded', `<my-button :rounded="true">rounded</my-button>`)

play('Box', module)
  .add('default', '<div style="height:30px;width:100px;border:1px solid;"></div>')
