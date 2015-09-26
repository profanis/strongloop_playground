var async = require("async");
var fs = require('fs');
var csv = require('csv');

module.exports = function (server) {
  var mongoDs = server.dataSources.mongo;

  createCountries();
  createUsers();

  async.parallel({
    suppliers: async.apply(createSuppliers)
  }, function (err, results) {
      if (err) throw err;
      console.log("Sample Suppliers succesfully created");
    });

  function createSuppliers(cb) {

    mongoDs.autoupdate("supplier", function (err) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      var Supplier = server.models.supplier;

      Supplier.create([
        { "name": "Fanis", "address": "test Fani's address", "email": "fanis@test.com" },
        { "name": "Tania", "address": "test Tania's", "email": "tania@test.com" },
        { "name": "Sasaxnh", "address": "test Sasaxnh's address", "email": "sasaxnh@test.com" }
      ]);
    });
  }

  function createUsers() {
    var User = server.models.User;

    User.create({ email: "testuser@gmail.com", password: "qqq111" }, function (err, user) {
      if (err) throw err;

      User.login({ email: 'testuser@gmail.com', password: 'qqq111' }, function (err, accessToken) {
        if (err) console.log(err);

        //console.log(accessToken);
      });
    });
  }

  function createCountries() {
    var readStream = fs.createReadStream(process.cwd() + '/resources/GeoPC_Countries.csv');
    var parser = csv.parse({ columns: true, delimiter: ';' }, function (err, data) {

      mongoDs.automigrate("country", function (err) {
        if (err) {
          console.log(err);
        }

        var Country = server.models.country;
        data.forEach(function (countryItem) {
          Country.create({ name: countryItem.country, code: countryItem.iso }, function (err, country) {
            if (err) throw err;
          });
        });

      });
    });
    readStream.pipe(parser);
  }
};