module.exports = {
  automock: false,
  collectCoverage: true,
  coverageReporters: ['lcov'],
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/**/*.js'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  }
}
