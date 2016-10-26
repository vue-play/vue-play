import {play, useComponents} from '../src'
import MyButton from './MyButton'
import Box from './Box'

useComponents({
  MyButton,
  Box
})

play({
  Button: {
    'with text': {
      template: '<my-button :handleClick="log">Text</my-button>',
      methods: {
        log() {
          this.$log(new Date())
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
  },
  Box: {
    'default': {
      template: '<box/>'
    },
    'red': {
      template: '<box color="red"/>'
    }
  }
})
