## Vue Play

Play and demonstrate your Vue components, inspired by [react-storybook](https://github.com/kadirahq/react-storybook).

## Play it in seconds

The only thing you need to install is `vue-play-cli`:

```bash
$ npm install -g vue-play-cli
```

Then, let's play with your Button component, create a `play.js` in the root directory of your project (anywhere else is ok):

```jsx
// you don't need to install vue-play!
import {play} from 'vue-play'
// import the button you wanna play
import MyButton from './components/MyButton.vue'

play({
  Button: {
    'with text'(h) {
      return <MyButton>Hello Play!</MyButton>
    },
    'with rounded border'(h) {
      return <MyButton rounded={true}>I'm rouned!</MyButton>
    }
  }
})
```

Run the play script with command `vue-play`, and [see it in action!](http://vue-play-button.surge.sh)

```bash
$ ~/my-button-component vue-play
> play at http://localhost:5000
```

## License

[MIT](https://egoist.mit-license.org) &copy; [EGOIST](https://github.com/egoist)
