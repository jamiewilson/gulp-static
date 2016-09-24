// Folder Structure Defaults
const build    = 'build'
const pages    = 'pages'
const layouts  = 'layouts'
const partials = 'partials'
const assets   = 'assets'
const css      = 'css'
const js       = 'js'
const img      = 'img'

// Where to look for source files
exports.src = {
  index:    `${pages}/index.html`,
  layouts:  `${pages}/${layouts}/*`,
  partials: `${pages}/${layouts}/${partials}/*`,
  pages:    [`!${pages}/index.html`, `${pages}/*.html`],
  markup:   [`!${pages}/index.html`, `${pages}/**/*`],
  scss:     `${assets}/${css}/**/*`,
  js:       `${assets}/${js}/**/*`,
  img:      `${assets}/${img}/**/*`
}

// Where to build your site
exports.dest = {
  dir: `${build}`,
  all: `${build}/*`,
  css: `${build}/${css}`,
  js:  `${build}/${js}`,
  img: `${build}/${img}`
}

// Where to serve build files
exports.server = { server: `${build}` }
