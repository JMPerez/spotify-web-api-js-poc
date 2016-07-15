module.exports = {
  entry: "./lib/server.js",
  output: {
    filename: "webpack-node-fetch.js"
  },
  module : {
    loaders: [{
      test   : /.js$/,
      loader : 'babel-loader'
    }]
  }
}
