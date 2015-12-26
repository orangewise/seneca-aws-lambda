process.env.AWS_PROFILE = 'test';

const test = require('ava');
const sinon = require('sinon');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const lambda = new AWS.Lambda();

const seneca = require('seneca')();
seneca.use('./', {
	instance: lambda
});

test.before(() => {
	sinon.stub(lambda, 'invoke', (params, done) => {
		done(null, {
			link: 'http://imgur.com/a/6DV8X'
		});
	});
});

test.after(() => {
	lambda.invoke.restore();
});

test.cb('Invoke a function', t => {
	seneca.act({role: 'aws-lambda', cmd: 'invoke', functionName: 'imgr-search', text: 'metalocolypse'}, (err, result) => {
		t.is(result.link, 'http://imgur.com/a/6DV8X');
		t.end(err);
	});
});
