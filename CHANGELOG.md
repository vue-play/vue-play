## v2.0.0 (2016/10/30)

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
