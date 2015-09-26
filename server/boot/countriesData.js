var fs = require('fs');
var csv = require('csv');

module.export = function (server) {
  console.log('dsdsdsdsdd@@@@@@@@@@@@@@@@@@@@@');
  var mongoDs = server.dataSources.mongo;

  createCountries();

  function createCountries() {

    var readStream = fs.createReadStream(__dirname + '/resources/GeoPC_Countries.csv');
    var parser = csv.parse({ columns: true }, function (err, data) {
      console.log(data);
    });
    readStream.pipe(parser);
    
//    mongoDs.automigrate("country", function (err) {
//      if (err) {
//        console.log(err);
//      }
//
//      var Country = server.models.country;
//      Country.create({ name: "greece", code: "gr" }, function (err, country) {
//        if (err) throw err;
//      });
//    });
  }
};