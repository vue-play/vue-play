module.exports = {
  cjs: true,
  vendor: false,
  compress: false,
  devtool: false,
  externals: [
    'vue',
    'eva.js',
    'highlight.js/lib/highlight',
    'highlight.js/lib/languages/javascript',
    'highlight.js/lib/languages/json',
    'highlight.js/lib/languages/xml',
    'uid',
    'vue-slim-modal',
    'query-string',
    'array-find-index'
  ],
  stats: {
    filename: '../stats.html'
  },
  postcss: {
    use: ['postcss-simple-vars']
  },
  production: {
    eslint: {
      globals: ['require']
    }
  },
  entry: {
    play: './src/play.js',
    app: './src/app.js',
    preview: './src/preview.js'
  }
}
