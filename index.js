var AWS = require('aws-sdk');

module.exports = function (options) {
	var seneca = this;
	var plugin = 'aws-lambda';

	options = {
		instance: options.instance || new AWS.Lambda()
	};

	seneca.add({role: plugin, cmd: 'invoke'}, function (args, done) {
		if (args.functionName) {
			var params = {
				FunctionName: args.functionName,
				Payload: JSON.stringify(args)
			};

			options.instance.invoke(params, done);
		}
	});

	return {
		name: plugin
	};
};
