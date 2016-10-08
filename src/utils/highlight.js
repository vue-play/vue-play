import hljs from 'highlight.js/lib/highlight'
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))

export default hljs
