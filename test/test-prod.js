let assert = require('assert');

describe('Test Run in PROD', function() {
	describe('ENV_NAME', function() {
		it('should be "PROD"', function() {
			assert.equal(process.env.ENV_NAME, 'PROD');
		});
	});
});
