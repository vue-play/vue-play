![logo](./media/logo.png)

Play and demonstrate your Vue components, inspired by [react-storybook](https://github.com/kadirahq/react-storybook).

## Play it in seconds

The only thing you need to install is `vue-play-cli`:

```bash
$ npm install -g vue-play-cli
```

For more usages , please head to the [handbook](https://egoistian.com/vue-play).

## Badges

|package|version|
|---|---|
|vue-play|[![vue-play](https://img.shields.io/npm/v/vue-play.svg?style=flat-square)](https://www.npmjs.com/package/vue-play)|
|vue-play-cli|[![vue-play-cli](https://img.shields.io/npm/v/vue-play-cli.svg?style=flat-square)](https://www.npmjs.com/package/vue-play-cli)|

## Development

```bash
# link vue-play in vue-play-cli
$ cd vue-play
$ npm link 
$ cd packages/vue-play-cli
$ npm link vue-play
$ npm link

# build vue-play
$ npm run build
# run example play script
$ vue-play playspot/play.js
```

## License

[MIT](https://egoist.mit-license.org) &copy; [EGOIST](https://github.com/egoist)
