# Display Example Code

You may want to display the source code of the example component, so use `example` property to finish the job:

```js
// example using jsx
Play({
  Button: {
    'with text': {
      example: '<MyButton>text</MyButton>',
      render(h) {
        return <MyButton>text</MyButton>
      }
    }
  }
})
```

If you are using **template syntax**, things couldn't be easier, since the value of `template` property will be used as `example` directly.