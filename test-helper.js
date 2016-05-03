require('babel-core/register')({
  // Ignore everything in node_modules except node_modules/rcomponents.
  ignore: /node_modules\/(?!tc-accounts)/,
  presets: ['es2015', 'react', 'stage-2']
})