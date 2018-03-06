var through = require ('through2')
var mjmlDefaultEngine = require ('mjml')
var gutil = require ('gulp-util')

var GulpError = gutil.PluginError
var NAME = 'MJML'

function error (file) {
  return function (message) {
    return new GulpError(
      NAME,
      'Error in file ' + file + ': ' + message
    )
  }
}

module.exports = function mjml (mjmlEngine, options) {
  if(!mjmlEngine) {
    mjmlEngine = mjmlDefaultEngine
  }
  if (options === undefined) {
    options = {}
  }

  return through.obj(function (file, enc, callback) {

    // Not a big fan of this deep copy methods
    // But it will work regardless of Node version
    var localOptions = JSON.parse(JSON.stringify(options))
    if (localOptions.filePath === undefined) {
      localOptions.filePath = file.path.toString()
    }

    const raise = error(localOptions.filePath)

    if (file.isStream()) {
      this.emit('error', raise('Streams are not supported!'))
      return callback()
    }

    if (file.isBuffer()) {
      var output = file.clone()
      var render

      try {
        render = mjmlEngine(file.contents.toString(), localOptions)
      } catch (e) {
        this.emit('error', raise(e.message))
        return callback()
      }

      output.contents = new Buffer(render.html)
      output.path = gutil.replaceExtension(file.path.toString(), '.html')
      this.push(output)
    }
    return callback()
  })
}
