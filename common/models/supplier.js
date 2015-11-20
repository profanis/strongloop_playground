module.exports = function (Supplier) {

	/**
	 * runs before the remote method.
	 */
	Supplier.beforeRemote('create', function(context, user, next) {
	    var req = context.req;
	    req.body.date = Date.now();
	    req.body.publisherId = req.accessToken.userId;
	    next();
	  });

	var isStatic = true;
	Supplier.disableRemoteMethod('find', isStatic);
//	Supplier.disableRemoteMethod('findById', isStatic);

	Supplier.status = function (cb) {

		var status = Supplier.create({
			"name": "Fanissss",
			"address": "test address",
			"email": "fanis@test.com"
		});


		cb(null, status);
	};
	Supplier.remoteMethod(
		'status', {
			http: { path: '/status', verb: 'get' },
			returns: { arg: 'status', type: 'string' }
		});
};
