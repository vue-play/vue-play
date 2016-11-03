![logo](./media/logo.png)

A minimalistic framework for demonstrating your Vue components, inspired by [react-storybook](https://github.com/kadirahq/react-storybook).

<details><summary>Table of Contents</summary>

<!-- toc -->

- [Getting started](#getting-started)
  * [The easy way](#the-easy-way)
  * [The hard way](#the-hard-way)
    + [App interface](#app-interface)
    + [Preview](#preview)
- [Writing Scenarios](#writing-scenarios)
  * [Keeping Scenarios](#keeping-scenarios)
  * [Writing Scenarios](#writing-scenarios-1)
  * [Loading Scenarios Dynamically](#loading-scenarios-dynamically)
  * [Register Components](#register-components)
- [Component Shorthand](#component-shorthand)
- [Additional Component Properties](#additional-component-properties)
  * [example](#example)
  * [readme](#readme)
- [Showcase](#showcase)
- [Development](#development)
- [License](#license)

<!-- tocstop -->

</details>

## Getting Started

### The easy way

```bash
# use npm or yarn
npm install -g getplay
cd my-vue-project
# run this to configure your project
getplay
# to start developing `play app`
npm run play
# to build the `play app`
npm run play:build
```

<details><summary>The hard way</summary>

There're two pages in your play app, one is the app interface which has a sidebar and it can toggle scenarios of your components, the other page is for rendering the examples, this page will be loaded as iframe in app interface.

And only the latter needs to load scenarios that you write in the `play entry`, let's say `./play/index.js`:

```js
import {play} from 'vue-play'
import MyButton from './MyButton.vue'

play('MyButton', module)
  .add('with text', h => h(MyButton, ['text']))
```

#### App interface

```js
// ./play/app.js
import app from 'vue-play/dist/app'
import 'vue-play/dist/app.css'

// bootstrap app
app()
```

#### Preview

```js
// ./play/preview.js
import preview from 'vue-play/dist/preview'
// loads the scenarios at ./play/index.js
import scenarios from './'

// actually render the scenarios in preview page
// when the preview page is ready
// it will tell the app interface what scenarios we have
preview(scenarios)
```

Add `app interface` and `preview` to your webpack entry:

```js
module.exports = {
  // ...
  entry: {
    app: './play/app.js',
    preview: './play/preview.js'
  },
  // don't forget to generate html output for both of them
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'preview.html',
      chunks: ['preview']
    })
  ]
}
```

That's it, you're all set!
</details>

## Writing Scenarios

`scenario`, a.k.a. story in react-storybook, it's usually an example for demostrating your real component.

### Keeping Scenarios

You can keep scenarios anywhere you want, for example you can keep them all at `./play/index.js`, you can also use separate files for them, or even name them `*.play.js` in your component directory and load them dynamically.

### Writing Scenarios

```js
import { play } from 'vue-play'
import MyButton from '../src/components/MyButton.vue'

// Use `play` to describe component title
// use .add to add scenario for that component
play('MyButton', module)
  .add('with text', h => h(MyButton, ['hello world']))
  .add('with emoji', h => h(MyButton, ['😃🍻']))
```

### Loading Scenarios Dynamically

We can use Webpack's [require.context](https://webpack.github.io/docs/context.html#require-context) to load modules dynamically.

```js
import { configure } from 'vue-play'

const load = requireContext => requireContext.keys().map(requireContext)

const scenarios = load(require.context('../src/components', true, /.play.js$/))

configure(scenarios, module)
```

### Register Components

If you are using render function you won't need to register components, you only need this when you are using the template property:

```js
// ./play/index.js
import MyButton from './MyButton.vue'

// these components will be registered globally
module.exports.components = {
  MyButton
}

play('MyButton', module)
  .add('with text', h => h(MyButton, 'hello world'))
```

You can also put the example `h => h(MyButton, 'hello world')` in a seperate file, like `.vue` file and register components there, locally.

## Component Shorthand

If you only need `template` or `render` property for your component, you can use `component shorthand`, which means you can directly set the value of scenario to a template string or render function:

```js
import Example from './Example.vue'
play('Button', module)
  .add('template shorthand', '<my-button>text</my-button>')
  .add('render function shorthand', h => h(MyButton, ['text']))
  .add('full component', {
    data() {},
    methods: {},
    render(h) {}
    // ...
  }).
  add('single file', Example)
```

**note:** If you are using `template` shorthand, you should use [Vue standalone build](https://vuejs.org/guide/installation.html#Standalone-vs-Runtime-only-Build) as well.

## Additional Component Properties

The component for each scenario is a typical Vue component, but it can also accept some additional properties for documenting its usage, eg:

```js
play('Button', module)
  add('with text', {
    // a valid vue component
    ...component,
    // additional
    example,
    // ...
  })
```

### example

Type: `string`

The example code of your component.

### readme

Type: `HTML string`

Optionally display a readme tab to show detailed usage.

## Showcase

Feel free to add your projects here:

- [button example](http://vue-play-button.surge.sh/#/) - [source](https://github.com/vue-play/vue-play/tree/master/play)
- [vue-slim-modal](https://egoistian.com/vue-slim-modal/#/) - [source](https://github.com/egoist/vue-slim-modal/tree/master/play)

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
