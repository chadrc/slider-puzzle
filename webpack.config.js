const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: "./app.jsx",
        vendor: ["react", "react-dom"]
    },

    output: {
        filename: "app.bundle.js"
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname),
        compress: true,
        port: 3000
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js",
            minChunks: Infinity
        })
    ]
};