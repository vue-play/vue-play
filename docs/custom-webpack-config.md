# Custom Webpack Config

Play Config has its limitation, in this situation you can provide a custom webpack config.

```bash
$ vue-play --webpack-config /path/to/webpack.config.js
```

## Notes

When you're using your own webpack.config.js, you have to install `vue-play` and loaders, plugins in your project.

Also, since vue-play-cli automatically adds the css file of vue-play to webpack entry when using built-in webpack config, you have yo do it manually in your webpack config.

```js
module.exports = {
  entry: ['./entry.js', 'vue-play/dist/vue-play.css']
}
```
