var through = require ('through2')
var mjmlDefaultEngine = require ('mjml')
var gutil = require ('gulp-util')

var GulpError = gutil.PluginError
var NAME = 'MJML'

module.exports = function mjml (mjmlEngine, options) {
  if(mjmlEngine === undefined) {
    mjmlEngine = mjmlDefaultEngine
  }
  if (options === undefined) {
    options = {}
  }

  return through.obj(function (file, enc, callback) {

    if (file.isStream()) {
      this.emit('error', new GulpError(NAME, 'Streams are not supported!'))
      return callback()
    }

    if (file.isBuffer()) {
      var output = file.clone()
      var render

      try {
        render = mjmlEngine.mjml2html(file.contents.toString(), options)
      } catch (e) {
        this.emit('error', new GulpError(NAME, e))
        return callback()
      }

      output.contents = new Buffer(render.html)
      output.path = gutil.replaceExtension(file.path.toString(), '.html')
      this.push(output)
    }
    return callback()
  })
}
