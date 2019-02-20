module.exports = {
  globals: {
    'ts-jest': {
      'tsConfigFile': '<rootDir>/tsconfig.json'
    }
  },
  testMatch: [
    '**/*.(test|spec).(ts|tsx)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/tests/stubs/image-stub'
  },
  moduleFileExtensions: [
    'ts', 'tsx', 'js'
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/jest.setup.js'
  ],
  collectCoverage: true
}
