const config = require('./jest.config');
config.displayName = 'Integration Test';
config.testMatch = ['**/*.int-spec.ts'];
module.exports = config;