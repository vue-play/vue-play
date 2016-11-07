module.exports = {
  cjs: true,
  vendor: false,
  compress: false,
  devtool: false,
  resolve: true,
  externals: [
    'vue',
    'vuex',
    'vue-router',
    'vuex-router-sync',
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
      globals: ['require', 'process'],
      rules: {
        'no-unused-expressions': ['error', {'allowShortCircuit': true}]
      }
    }
  },
  entry: {
    play: './src/play.js',
    app: './src/app.js',
    preview: './src/preview.js'
  }
}
