// Folder Structure Defaults
const build  = 'build'
const pages  = 'pages'
const assets = 'assets'
const css    = 'css'
const js     = 'js'
const img    = 'img'
const misc   = 'misc'
const clean   = '{!.git,*}'

// Where to look for source files
exports.src = {
  index:   `${pages}/index.html`,
  pages:   `${pages}/!(index).html`,
  layouts: `${pages}/**/_*.html`,
  scss:    `${assets}/${css}/**/*.scss`,
  js:      `${assets}/${js}/**/*`,
  img:     `${assets}/${img}/**/*`,
  misc:    `${misc}/**/*`
}

// Where to build your site
exports.dest = {
  dir:   `${build}`,
  css:   `${build}/${css}`,
  js:    `${build}/${js}`,
  img:   `${build}/${img}`,
  clean: `${build}/${clean}`,
  misc:  `${build}/`
}
