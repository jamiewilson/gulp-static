// https://github.com/colynb/gulp-swig
// https://github.com/mvhenten/swig-marked
// https://github.com/isagalaev/highlight.js
const swig = require('gulp-swig')
const marked = require('swig-marked')

marked.configure({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  smartypants: true
})

module.exports = {
  data: {
    name:        'statt',
    title:       'New Site',
    description: 'Your description.'
  },
  setup: function(swig) {
    marked.useTag(swig, 'markdown')
  },
  // Avoid caching when watching/compiling html templates
  defaults: { cache: false }
}
