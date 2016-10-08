![logo](./media/logo.png)

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
      // in the component
      // you can use this.$log and this.$clear to debug
      return <MyButton on-click={this.$log('hi')}>Hello Play!</MyButton>
    },
    'with rounded border'(h) {
      return <MyButton rounded={true}>I'm rouned!</MyButton>
    }
  }
})
```

Run the play script with command `vue-play`, and [see it in action!](http://vue-play-button.surge.sh) ([code](https://github.com/egoist/vue-play-button))

```bash
$ ~/my-button-component vue-play
> play at http://localhost:5000
```

Share the play spot with your team mates!

```bash
# bundled into ./play-dist
$ vue-play -p
# for example, deploy to gh-pages
$ gh-pages -d ./play-dist
```

## Advanced

### States and methods

How do I write play script so that my component can call a method or update a state? Well, you can simply:

```js
// pass a component object
play({
  Button: {
    'with text': {
      data() {
        return {/* ... */}
      },
      methods: {
        handleClick() {/* ... */}
      },
      render(h) {
        return <MyButton on-click={this.handleClick}>text</MyButton>
      }
    }
  }
})
```

### Play config

In most cases you only need to update babel, postcss or loaders, so here's the API for that:

```js
// play.config.js
module.exports = {
  // all the cli options can be defined here and:
  browsers: [], // autoprefixer browsers
  babel: {}, // override babel options
  postcss: [], // or function, override postcss options
  loaders: [], // append to current loaders
}
```

Run `vue-play -c` will auto load this file, and `-c /path/to/custom/file` to change location.

### Use your own webpack config file

Check out the [default webpack config](https://github.com/egoist/vue-play/blob/master/packages/vue-play-cli/lib/make-config.js), in brief, you can play with:

**babel**: es2015 stage-2<br>
**postcss**: postcss-nested postcsss-simple-vars<br>
**image and fonts**: file-loader

Provide your own webpack.config.js and pass the path to it in `--webpack-config` option. In this way you will need to install loaders and plugins you used in your project, since the default config was totally overridden.

## Badges

|package|version|
|---|---|
|vue-play|[![vue-play](https://img.shields.io/npm/v/vue-play.svg?style=flat-square)](https://www.npmjs.com/package/vue-play)|
|vue-play-cli|[![vue-play-cli](https://img.shields.io/npm/v/vue-play-cli.svg?style=flat-square)](https://www.npmjs.com/package/vue-play-cli)|

## Development

```bash
# link vue-play in vue-play-cli
$ cd vue-play
$ npm link 
$ cd packages/vue-play-cli
$ npm link vue-play
$ npm link

# build vue-play
$ npm run build
# run example play script
$ vue-play example.js
```

## License

[MIT](https://egoist.mit-license.org) &copy; [EGOIST](https://github.com/egoist)
