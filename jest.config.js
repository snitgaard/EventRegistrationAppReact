module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': 'ts-jest'
  },
};