# README for components

Besides example code, you may want to add more tips on how to use your components, then try out `readme` property. The value of it should be an html string, writing *long* html string by hand is like hell, so we provide a markdown loader for you to make it easier.

```js
Play({
  Button: {
    'with text': {
      readme: require('./button-readme.md'),
      // ...
    }
  }
})
```
