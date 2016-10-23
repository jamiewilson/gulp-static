// Style and display errors in-browser
// with browsersync.notify() and gulp-plumber
// Using gulp-util for in-console errors

const bs = require('browser-sync')
const gutil = require('gulp-util')

const errorMessageStyle = `
  padding: 5%;
  position: fixed;
  font-family: Monaco, Menlo, monospace;
  text-align: left;
  line-height: 1.8;
  z-index: 9999;
  right: 0;
  top: 0;
  left: 0;
  color: #fff;
  background-color: #f41e1e;
`

const errorTitleStyle = `
  background: white;
  color: #000;
  display: inline-block;
  margin-bottom: 20px;
  padding: 4px 8px;
`

const inBrowser = err => {
  bs.notify(`
    <div style="${errorMessageStyle}">
      <div style="${errorTitleStyle}">
        ${err.plugin}
      </div>
      <div style="white-space: pre-wrap;">${err.message}</div>
    </div>
  `, 5*60*10000)
}

const inConsole = err => gutil.log(
  gutil.colors.gray(`\n\n----------------------------------\n\n`) +
  gutil.colors.red(`ERROR: ${err.plugin}\n\n`) + err.message +
  gutil.colors.gray(`\n\n----------------------------------\n\n`)
)

exports.onError = function (err) {
  inBrowser(err)
  inConsole(err)
  this.emit('end')
}
