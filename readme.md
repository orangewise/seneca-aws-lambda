# seneca-aws-lambda

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]

This plugin invokes AWS Lambda functions.

## Install

Install via npm. You will need install Seneca.js also.

```
npm install seneca-aws-lambda
```

## Setup

```js
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

var seneca = require('seneca')();
seneca.use('aws-lambda');
```

### options

- **instance**: (string, default 'new AWS.Lambda()') an instance of AWS Lambda you want to use

```js
var AWS = require()
var seneca = require('seneca')();

// Use a shared key string
seneca.use('aws-lambda', {
  instance: new AWS.Lambda({apiVersion: '2015-03-31'})
});
```

## AWS Configuration

Refer to the [AWS SDK][aws-sdk-url] for authenticating to AWS prior to using this plugin.

### Provided actions
`seneca-aws-lambda` provide the following actions. (all including the `{role: "aws-lambda"}`)

#### invoke - run a lambda function
- arguments: `functionName`  
all other arguments are passed to the lambda function
- result: *result of the lambda function*

```js
seneca.act({role: 'aws-lambda', cmd: 'invoke', functionName: 'imgr-search', text: 'metalocolypse'}, function (err, results) {
	if (err) {
		return console.log(err);
	}

	console.log(results); // Show the results of the lambda function
});
```

## Test

```
npm test
```

[travis-badge]: https://api.travis-ci.org/blainsmith/seneca-aws-lambda.svg
[travis-url]: https://travis-ci.org/blainsmith/seneca-aws-lambda
[npm-badge]: https://badge.fury.io/js/seneca-aws-lambda.svg
[npm-url]: https://badge.fury.io/js/seneca-aws-lambda
[aws-sdk-url]: http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html


## License

MIT © [Blain Smith](http://blainsmith.com)
