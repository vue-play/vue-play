The core module used in `vue-play-cli`

Example:

```js
import {play} from 'vue-play'
// import the button you wanna play
import MyButton from './components/MyButton.vue'

play({
  Button: {
    'with text'(h) {
      return <MyButton>Hello Play!</MyButton>
    }
  }
})
```
