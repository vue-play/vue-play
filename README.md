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

Then you can bundle this little app with your desired tool like webpack or browserify.

## Bundler

You can use your custom webpack or browserify config to bundle your play app, but we use [vbuild](https://vbuild.js.org/) to get job done faster and easier.

## Component Shorthand

If you only need `template` or `render` property for your component, you can use `component shorthand`, which means you can directly return a template string or render function as the component:

```js
play.start({
  Button: {
    // template shorthand
    'with template': '<my-button>text</my-button>',
    // render function shorthand
    'with render function': h => h(MyButton, ['text']),
    // sure you can use JSX
    'with jsx': h => <MyButton>text</MyButton>
  }
})
```

## Additional Component Properties

Your example component is a typical Vue component, but it can accept some additional properties for documenting its usage.

### example

Type: `string`

The example code of your component.

### readme

Type: `HTML string`

Optionally display a readme tab to show detailed usage.

## API

### play.useComponents(components)

#### components

Type: `object`<br>
Required: `true`

Just like the way you register local components in Vue.

```js
play.useComponents({
  'my-component-name': MyComponent
})
```

### play.start(definitions, [selector])

### definitions

Type: `object`<br>
Required: `true`

The definitions of various scenarios for your component:

```js
play.start({
  Button: {
    'with text': exampleComponent
  }
})
```

### selector

Type: `string`<br>
Default: `#app`

Where to mount the app.

## Development

```bash
# run example play script
npm run play

# build vue-play
# you don't need this when developing
npm run build
```

## License

[MIT](https://egoist.mit-license.org) &copy; [EGOIST](https://github.com/egoist)
