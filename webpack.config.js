module.exports = {
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 5150
  },
  entry: './index.js',
  output: {
    filename: 'to-png.js',
    library: 'to-png',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [ 'minify', 'es2015', 'stage-0' ]
          }
        },
        'eslint-loader',
      ]
    }]
  }
};
