# Play Script

A play script is basically where you import your components and write demos. Here's a simple one:

```js
// install vue-play in your project first
import {play, useComponents} from 'vue-play'
import MyButton from './component/MyButton'
// the component you'd like to play

// register your component globally in the app instance
useComponents({
  MyButton
})

play({
  // name your component
  Button: {
    // describe the behavior you wanna test
    'with text': '<my-button>text</my-button>'
  }
})
```

That's it, the very first play spot for your button component is done!

Run the command:

```bash
$ ~/my-project vue-play
# navigate to http://localhost:5000
# and you'll see the play spot in action!
```

## Use Components

You can register component globally with `useComponents` helper if you use template syntax, but you can also register them locally:

```js
import MyButton from './component/MyButton'

Play({
  Button: {
    'with text': {
      template: '<my-button>text</my-button>',
      components: {MyButton}
    }
  }
})
```

## JSX and Hyperscript

You can also use JSX or hyperscript if you like:

```js
import MyButton from './component/MyButton'

Play({
  Button: {
    // this will be used as render function to form a component
    'with text'(h) {
      return <MyButton>text</MyButton>
    }
  }
})
```

By using render function, you don't need to register components manually, which could be more convenient than template syntax.

## Full Component

By default there're two short hands for template and render function.

- Return a string will be used as template
- Return a function will be used as render function

But you can pass a full component object, if you really need that :)
