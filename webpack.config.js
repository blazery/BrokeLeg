const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./dist/index.js",
    output: {
        filename: "main.js",
        path: __dirname + "/build",
        publicPath: "/build/"
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8080
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};