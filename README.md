![logo](./media/logo.png)

A minimalistic framework for demonstrating your Vue components, inspired by [react-storybook](https://github.com/kadirahq/react-storybook).

## Install

```bash
npm install --save-dev vue-play
```

<details><summary>Table of Contents</summary>

<!-- toc -->

- [Usage](#usage)
- [Bundler](#bundler)
- [Component Shorthand](#component-shorthand)
- [Additional Component Properties](#additional-component-properties)
  * [example](#example)
  * [readme](#readme)
- [Showcase](#showcase)
- [API](#api)
  * [play.useComponents(components)](#playusecomponentscomponents)
    + [components](#components)
  * [play.describe(name, [callback])](#playdescribename-callback)
    + [name](#name)
    + [callback](#callback)
      - [add(scenario, component)](#addscenario-component)
        * [scenario](#scenario)
        * [component](#component)
  * [play.start([selector])](#playstartselector)
    + [selector](#selector)
- [Development](#development)
- [License](#license)

<!-- tocstop -->

</details>

## Usage

`vue-play` is just a framework based on `vue`, so directly import it in an entry file:

```js
import {Play} from 'vue-play'
import 'vue-play/dist/vue-play.css'

const play = new Play()

// import your component
import MyButton from './MyButton.vue'

// register the component
play.useComponents({
  MyButton
})

// add a playspot for MyButton
play.describe('MyButton', add => {
  // add various scenario
  add('with text', '<my-button>text</my-button>')
  add('with emoji', '<my-button>🌟🤔</my-button>')
})
```

Then you can bundle this little app with your desired tool like webpack or browserify.

## Bundler

You can use your custom webpack or browserify config to bundle your play app, but we use [vbuild](https://vbuild.js.org/) to get job done faster and easier.

## Component Shorthand

If you only need `template` or `render` property for your component, you can use `component shorthand`, which means you can directly set the value of scenario to a template string or render function:

```js
play.describe('Button', add => {
  add('template shorthand', '<my-button>text</my-button>')
  add('render function shothand', h => h(MyButton, ['text']))
  add('full component', {
    data() {},
    methods: {},
    return(h) {}
    // ...
  })
})
```

## Additional Component Properties

The component for each scenario is a typical Vue component, but it can also accept some additional properties for documenting its usage, eg:

```js
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
- [vue-slim-modal](https://egoistian.com/vue-slim-modal/#/) - [source](https://github.com/egoist/vue-slim-modal/tree/master/playspot)

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

### play.describe(name, [callback])

#### name

Type: `string`<br>
Required: `true`

The name of the playspot, eg: `MyButton`.

#### callback

Type: `function`<br>
Param: `add`

If no callback function, `play.describe` will return the `add` function.

##### add(scenario, component)

The param `add` lets you add scenario to the playspot, one at a time.

###### scenario

Type: `string`<br>
Required: `true`

The scenario name, eg: `with text`

###### component

Type: `VueComponent`<br>
Required: `true`

Example component to render in this senario.

### play.start([selector])

#### selector

Type: `string`<br>
Default: `#app`

Where to mount the app.

### action

#### action.log(data)

Log data in `play app`'s console

#### action.clear()

Clear logs in current scenario.

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
