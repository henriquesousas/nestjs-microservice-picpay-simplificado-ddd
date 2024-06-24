const config = require('./jest.config');
config.displayName = 'Unit tests';
config.testMatch = ['**/*.spec.ts'];
module.exports = config;