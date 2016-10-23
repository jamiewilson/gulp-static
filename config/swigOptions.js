const swig = require('gulp-swig')
const marked = require('swig-marked')

// https://github.com/colynb/gulp-swig
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
