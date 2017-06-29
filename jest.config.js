module.exports = {
  automock: false,
  resetModules: true,
  collectCoverage: true,
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.js'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  }
}
