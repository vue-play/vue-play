![logo](./media/logo.png)

A minimalistic framework for demonstrating your Vue components, inspired by [react-storybook](https://github.com/kadirahq/react-storybook).

## Install

```bash
npm install --save-dev vue-play
```

## Usage

`vue-play` is just a framework based on `vue`, so directly import it in an entry file:

```js
import Play from 'vue-play'

const play = new Play()

// import your component
import MyButton from './MyButton.vue'

// register the component
play.useComponents({
  MyButton
})

play.start({
  // The component name
  Button: {
    // the various scenarios
    'with text': '<my-button>text</my-button>',
    'with emoji': '<my-button>🌟🤔</my-button>'
  }
})
```

Then you can bundle this little app with your desired tool like webpack or browserify. Optionally you can use [vbuild](https://vbuild.js.org/) to finish the job faster.

## Development

```bash
# run example play script
npm run play

# build vue-play
# you don't need this when developing
$ npm run build
```

## License

[MIT](https://egoist.mit-license.org) &copy; [EGOIST](https://github.com/egoist)
