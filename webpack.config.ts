const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "single-spa-config.ts"),
    cache: false,
    mode: "development",
    devtool: "source-map",
    optimization: {
        minimize: false
    },
    output: {
        publicPath: "http://localhost:3003/"
    },
    resolve: {
        extensions: [".jsx", ".js", ".json", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            ['@babel/preset-typescript']
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "saturn",
            library: { type: "var", name: "saturn" },
            filename: "saturn.js",
            exposes: {
                Saturn: "./single-spa-config.ts"
            },
            remotes: {
                mf: "mf",
                madrox: "madrox",
            },
            shared: ["single-spa-react"]
        }),
        // new HtmlWebpackPlugin({
        //     template: "./index.html"
        // })
    ]
};