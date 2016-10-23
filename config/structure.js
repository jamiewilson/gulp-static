// Folder Structure Defaults
const build  = 'build'
const pages  = 'pages'
const assets = 'assets'
const css    = 'css'
const js     = 'js'
const img    = 'img'
const misc   = 'misc'
const keep   = '{!.git,*}'

// Where to look for source files
exports.src = {
  index:   `${pages}/index.html`,
  pages:   `${pages}/!(index).html`,
  layouts: `${pages}/**/_*.html`,
  scss:    `${assets}/${css}/**/*.scss`,
  js:      `${assets}/${js}/**/*`,
  img:     `${assets}/${img}/**/*`
}

// Where to build your site
exports.dest = {
  dir:   `${build}`,
  css:   `${build}/${css}`,
  js:    `${build}/${js}`,
  img:   `${build}/${img}`,
  misc:  `${build}/${misc}`,
  clean: `${build}/${keep}`
}

// Where to serve build files
exports.server = { server: `${build}` }
