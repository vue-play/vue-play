module.exports = {
  cjs: true,
  vendor: false,
  compress: false,
  devtool: false,
  externals: [
    'eva.js',
    'highlight.js/lib/highlight',
    'highlight.js/lib/languages/javascript',
    'highlight.js/lib/languages/json',
    'highlight.js/lib/languages/xml',
    'uid'
  ],
  filename: 'vue-play',
  stats: {
    filename: '../stats.html'
  },
  production: {
    eslint: {
      globals: ['require']
    }
  }
}
