const path = require('path');
var fs = require('fs');


const config = {
    mode: 'development',
    entry: "./src/index.tsx",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    output: {
        filename: "main.js",
        path: __dirname + "/build",
        publicPath: "/build/"
    },
    watch: true,
    devServer: {
        contentBase: [path.join(__dirname, 'public'), './'],
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
        console.log('Copied index.html');
    });
}

module.exports = config;