var async = require("async");

module.exports = function(server) {
    var mongoDs = server.dataSources.mongo;

    createUsers();

    async.parallel({
        suppliers: async.apply(createSuppliers)
    }, function(err, results) {
        if (err) throw err;
        console.log("Sample Suppliers succesfully created");
    });

    function createSuppliers(cb) {

        mongoDs.autoupdate("Supplier", function(err) {
            if (err) {
                console.log(err);
                return cb(err);
            }
            var Supplier = server.models.Supplier;

            Supplier.create([{
                "name": "Fanis",
                "address": "test Fani's address",
                "email": "fanis@test.com"
            }, {
                "name": "Tania",
                "address": "test Tania's",
                "email": "tania@test.com"
            }, {
                "name": "Sasaxnh",
                "address": "test Sasaxnh's address",
                "email": "sasaxnh@test.com"
            }]);
        });
    }

    function createUsers() {
        var User = server.models.User;

        User.create({
            email: "testuser@gmail.com",
            password: "qqq111"
        }, function(err, user) {
            if (err) throw err;

            loginUser(User);
        });
    }

    function loginUser(User) {

        User.login({
            email: 'testuser@gmail.com',
            password: 'qqq111'
        }, function(err, accessToken)  {
            if (err) console.log(err);

            console.log(accessToken);
        });
    }
};
