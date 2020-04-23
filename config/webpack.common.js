const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            fontawesome: path.resolve(__dirname, '../node_modules/@fortawesome/fontawesome-free/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            {
                                plugins: ["@babel/plugin-proposal-class-properties"]
                            }
                        ],
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(gif|png|jp(e*)g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            //disable: true, // webpack@2.x and newer
                        },
                    }]
            },
            // {
            //     test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: './dist/webfonts',
            //             publicPath: './dist/webfonts'
            //         }
            //     }]
            // }
        ]
    }
};