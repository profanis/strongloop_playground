var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();


app.start = function() {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};

//To use cookies for authentication, add the following to server.js (before boot):
//app.use(loopback.token({ model: app.models.accessToken }));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.

var bootOptions = {
    "appRootDir": __dirname,
    "bootDirs":[
      process.cwd() + '/server/boot/01_System',
      process.cwd() + '/server/boot/02_Sample' 
    ]
    /*"bootScripts": [
        process.cwd() + '/server/boot/sampleData.js',
        process.cwd() + '/server/boot/countriesData.js'
    ]*/
};
boot(app, bootOptions, callBackBoot);


//boot(app, __dirname, callBackBoot);

function callBackBoot(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
};
