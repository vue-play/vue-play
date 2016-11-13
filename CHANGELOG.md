## v2.1.0 (2016/11/13)

### Core

- allow to use component as play() argument

```js
// before 2.1.0 we can do
play('this is my component', module)
  .add('with text', h => h(MyCompoent))

// now we can also
play(MyComponent, module)
  .displayName('this is my component')
  .add('with text', h => h(MyCompoent))
```

## v2.0.0 (2016/11/03)

### Core

- Set preview to an independent webpack entry and load it in iframe
- Update `play entry` syntax to be more similar to react-storybook

### Other

- Update `vue-play-cli` to support new core changes

## v2.0.0-beta.1 (2016/10/30)

### Core

- Use iframe to load scenario
- add `play.describe` method for adding playspot

```js
play.describe('Button', add => {
  add('with text', '<button>text</button>')
})

// if no callback function, it returns the `add` function
const addButton = play.describe('Button')
addButton('with text', '<button>text</button>')
```

- `play.start` now only needs the `selector` argument, and it defaults to `#app`

```js
// mount the app to #root element
play.start('#root')
```

- add `action` to replace `this.$log` and `this.$clear`

### Other

- adjust the buzz words
  - `playspot` is for the thing you `play.describe`
  - `scenario` is a scenario for demonstrating your playspot
  - `play app` is the whole app

```js
// describe a playspot
play.describe('button', add => {
  // add a scenario called 'with text'
  add('with text', '<button>text</button>')
})
```
