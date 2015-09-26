var fs = require('fs');
var csv = require('csv');

module.exports = function(server) {
    var mongoDs = server.dataSources.mongo;

    init();

    function init() {
        var readStream = fs.createReadStream(process.cwd() + '/resources/GeoPC_Countries.csv');

        var csvOptions = {
            columns: true,
            delimiter: ';'
        };

        var parser = csv.parse(csvOptions, parseCallBack);
        readStream.pipe(parser);

        function createCountriesFromCsv(csvData) {
            var Country = server.models.country;
            csvData.forEach(function(countryItem) {
                Country.create({
                    name: countryItem.country,
                    code: countryItem.iso
                }, function(err, country) {
                    if (err) throw err;
                });
            });
        }

        function parseCallBack(err, csvData) {

            mongoDs.autoupdate("country", function(err) {

                if (err) {
                    console.log(err);
                }
                createCountriesFromCsv(csvData);

            });
        }
    }
};
