const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const production = argv.mode === 'production'

    return {
        mode: production ? 'production' : 'development',
        devtool: production ? 'nosources-source-map' : 'source-map',
        entry: {
            'base-styles': './src/styles/base.scss',
            'app': './src/index.js'
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: '/node_modules/',
                    loader: 'eslint-loader',
                    options: {
                        rules: {
                            'no-console': production ? 'error' : 'warn'
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.template.html$/,
                    use: ['raw-loader']
                }
            ]
        },
        resolve: {
            alias: {
                '@local': path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            new DotEnv()
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    }
}
