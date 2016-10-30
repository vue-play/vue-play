import {Play, action} from '../src'
import MyButton from './MyButton'
import Box from './Box'

const play = new Play()

play.useComponents({
  MyButton,
  Box
})

play.describe('Button', add => {
  add('with text', {
    template: '<my-button :handleClick="log">Text</my-button>',
    methods: {
      log() {
        action.log(new Date())
      }
    }
  })
  add('with emoji', '<my-button>😄🤗😃😐😲</my-button>')
  add('with color', '<my-button color="magenta">magenta button</my-button>')
})

play.describe('Box', add => {
  add('default', '<box />')
  add('dashed border', '<box :dashed="true" />')
  add('dotted border', '<box :dotted="true" />')
})

const playCircle = play.describe('Circle')
playCircle('default', '<h2>just an example...</h2>')

play.start('#app')
