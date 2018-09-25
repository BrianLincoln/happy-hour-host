module.exports = {
  presets: ['env', 'react'],
  env: {
    test: {
      plugins: ['transform-class-properties'],
    },
    moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  },
};
