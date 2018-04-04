let assert = require('assert');

describe('Test Run in UAT', function() {
	describe('ENV_NAME', function() {
		it('should be "UAT"', function() {
			assert.equal(process.env.ENV_NAME, 'UAT');
		});
	});
	describe('UAT-VAR', function() {
		it('should be "value1"', function() {
			assert.equal(process.env['UAT-VAR'], 'value1');
		});
	});
});