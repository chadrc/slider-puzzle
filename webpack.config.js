const path = require("path");

module.exports = {
    entry: "./app.jsx",

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
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname),
        compress: true,
        port: 3000
    }
};