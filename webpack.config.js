module.exports = {
  devServer: {
    contentBase: `${__dirname}/docs`,
    compress: true,
    port: 5150,
  },
  entry: {
    './dist/': './index.js',
    './docs/dist/': './index.js',
  },
  output: {
    filename: '[name]to-png.js',
    library: 'to-png',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['minify', 'es2015', 'stage-0'],
            },
          },
          'eslint-loader',
        ],
      },
    ],
  },
};
