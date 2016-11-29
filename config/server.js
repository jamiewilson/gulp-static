// https://browsersync.io/docs/options
const destDir = require('./structure').dest.dir

module.exports = {
  server: `${destDir}`,
  ui: false,
  ghostMode: false
}
