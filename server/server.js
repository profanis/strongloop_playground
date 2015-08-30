var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();


app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

//To use cookies for authentication, add the following to server.js (before boot):
//app.use(loopback.token({ model: app.models.accessToken }));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});