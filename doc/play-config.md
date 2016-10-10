# Play Config

The default webpack config:

|type|options|
|---|---|
|babel|es2015 stage-2|
|postcss|postcss-nested postcsss-simple-vars|
|images and fonts|file-loader|
 
`play.config.js` is a simple way to extend the base build config (mainly webpack webpack).

```js
module.exports = {
  // all the cli options can be defined here and:
  browsers: [], // autoprefixer browsers
  babel: {}, // override babel options
  postcss: [], // or function, override postcss options
  loaders: [], // append to current loaders
}
```

Run `vue-play -c` to load play config at `./play.config.js`, and `-c /path/to/config` to change location.
