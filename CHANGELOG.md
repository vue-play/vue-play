## v2.0.0 (2016/10/30)

### Core

- Use iframe to load scenario
- add `play.describe` method for adding playspot

```js
const playButton = play.describe('Button', {
  'with text': '<button>text</button>'
})

// you can also dynamically add new scenario
playButton.add('with emoji', '<button>🌟</button>')
```

- `play.start` now only needs the `selector` argument, and it defaults to `#app`

```js
// mount the app to #root element
play.start('#root')
```

### Other

- adjust the buzz words
  - `playspot` is for the thing you `play.describe`
  - `scenario` is a scenario for demonstrating your playspot
  - `play app` is the whole app

```js
// playButton is a playspot
const playButton = play.describe('button')

// 'with text' is a scenario
playButton.add('with text', '<button>text</button>')
```
