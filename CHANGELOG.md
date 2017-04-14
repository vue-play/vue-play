## [Version 3.2.1](https://github.com/egoist/vue-play/releases/tag/v3.2.1) (2017-4-14)

### Bug fixes

- fix npm script: [`ef2dcda`](https://github.com/egoist/vue-play/commit/ef2dcda)

[...full changes](https://github.com/egoist/vue-play/compare/v3.2.0...v3.2.1)

## [Version 3.2.0](https://github.com/egoist/vue-play/releases/tag/v3.2.0) (2017-4-14)

### New features

- Device Toolbar: [`8002688`](https://github.com/egoist/vue-play/commit/8002688) ([#57](https://github.com/egoist/vue-play/issues/57))

[...full changes](https://github.com/egoist/vue-play/compare/v3.1.3...v3.2.0)

## [Version 3.1.2](https://github.com/egoist/vue-play/releases/tag/v3.1.2) (2017-3-31)

### Bug fixes

- [Hotfix] fix readme not showing: [`5d251c2`](https://github.com/egoist/vue-play/commit/5d251c2) ([#55](https://github.com/egoist/vue-play/issues/55))

[...full changes](https://github.com/egoist/vue-play/compare/v3.1.1...v3.1.2)

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
