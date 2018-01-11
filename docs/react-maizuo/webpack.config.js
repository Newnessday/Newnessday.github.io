/**
 * @fileOverview
 * @time 2017/12/3
 * @author liugang
 * */

const path=require('path');

module.exports={

    entry: './src/router',

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: 'chunk/[name].[chunkhask].js',
        publicPath: 'dist/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]

    },

    devServer: {
        port: 8888,
        // host: '172.16.4.60',
        proxy: {
            "/api/*": 'http://localhost:9000'
        }
    },

    devtool: 'source-map'

}


