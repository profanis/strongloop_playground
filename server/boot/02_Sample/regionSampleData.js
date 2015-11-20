module.exports = function(server) {
  var db = server.dataSources.mongo;
  var Region = server.models.Region;

  db.autoupdate("region", function(err) {

    var query = {
      where: {
        code: 'GR'
      }
    };

    server.models.Country.findOne(query, function(err, country) {
      var regions = [{
        "name": "Attica",
        "code": "GR-I",
        "path": "Attica",
        "pathIds": "",
        "country_id": country.id
      }, {
        "name": "Athens",
        "code": "",
        "path": "Attica,Athens",
        "pathIds": ""
      }, , {
        "name": "Marousi",
        "code": "",
        "path": "Attica,Athens,Marousi",
        "pathIds": ""
      }];

      regions.forEach(function(item) {
        Region.create(item, function(err, instance) {
          if (err) return console.log(err);
        })
      });

    });

  })
}
