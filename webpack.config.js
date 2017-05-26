const path = require("path");
const webpack = require("webpack");

module.exports = {
    context: path.resolve(__dirname, "app"),
    entry: {
        patch: 'react-hot-loader/patch',
        server: 'webpack-dev-server/client?http://localhost:3000',
        webpack: 'webpack/hot/only-dev-server',
        app: "./app.jsx",
        vendor: ["react", "react-dom"]
    },

    devtool: "inline-source-map",

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
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
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "file-loader?name=[path][name].[ext]",
                    "extract-loader",
                    "html-loader"
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
        compress: true,
        port: 3000,
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js",
            minChunks: Infinity
        })
    ]
};