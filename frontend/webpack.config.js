const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "net": false,  // ❌ Ignore 'net'
      "tls": false,  // ❌ Ignore 'tls'
      "fs": false    // ❌ Ignore 'fs'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    })
  ]
};
