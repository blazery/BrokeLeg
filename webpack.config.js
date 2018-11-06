const path = require('path');
var fs = require('fs');


const config = {
    mode: 'development',
    entry: "./src/index.ts",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
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

if (process.env.BUILD_TYPE === 'production') {
    config.watch = false;
    // destination.txt will be created or overwritten by default.
    if (!fs.existsSync('./build')) {
        fs.mkdirSync('./build');
    }
    fs.copyFile('./public/index.html', './build/index.html', (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    });
}

module.exports = config;