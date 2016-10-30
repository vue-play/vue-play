import {Play, action} from '../src'
import MyButton from './MyButton'
import Box from './Box'

const play = new Play()

play.useComponents({
  MyButton,
  Box
})

play.describe('Button', {
  'with text': {
    template: '<my-button :handleClick="log">Text</my-button>',
    methods: {
      log() {
        action.log(new Date())
      }
    }
  },
  'with emoji': '<my-button>😄🤗😃😐😲</my-button>',
  'with colors': `
<div class="examples">
  <my-button color="red">red button</my-button>
  <my-button color="blue">blue button</my-button>
  <my-button color="magenta">magenta button</my-button>
</div>
  `.trim()
})

const playBox = play.describe('Box', {
  'default': {
    template: '<box/>'
  },
  'red': {
    template: '<box color="red">red</box>'
  }
})

playBox
  .add('dashed border', '<box :dashed="true" />')
  .add('dotted border', '<box :dotted="true" />')

play.start('#app')
