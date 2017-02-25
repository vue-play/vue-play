import Vue from 'vue'
import Vuex from 'vuex'
import {play} from '../src/play'
import MyButton from './MyButton.vue'

Vue.component('my-button', MyButton)

play('Button')
  .add('with text', {
    template: `<my-button :handle-click="log">{{ $store.state.count }}</my-button>`,
    store: new Vuex.Store({
      state: {count: 0}
    }),
    methods: {
      log() {
        this.$store.state.count++
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
