const fs = require('fs')
const path = require('path')
var reqlib = require('app-root-path').require

const webConfig = reqlib('/config/webConfig')

function findFiles (folder, ext) {
  const folderPath = path.join(__dirname, '..', 'dist', folder)
  const folderFiles = fs.readdirSync(folderPath)
  return folderFiles.filter(function (file) {
    return path.extname(file).toLowerCase() === `.${ext.toLowerCase()}`
  }).map(function (file) {
    return path.join(folder, file)
  })
}

const cssFiles = findFiles(path.join('static', 'css'), 'css')
const jsFiles = findFiles(path.join('static', 'js'), 'js')

function basePath (config, headers) {
  return (headers['x-external-path'] || config.base).replace(/\/$/, '')
}

module.exports = function (req, res) {
  res.render('index.ejs', {
    config: {
      ...webConfig,
      base: basePath(webConfig, req.headers)
    },
    cssFiles,
    jsFiles
  })
}
