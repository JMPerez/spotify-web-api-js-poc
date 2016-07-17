module.exports = {
  entry: "./lib/server.js",
  output: {
    filename: "webpack-poc.js"
  },
  module : {
    loaders: [{
      test   : /.js$/,
      loader : 'babel-loader'
    }]
  }
}
