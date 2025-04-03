const path = require('path')
const entries = require('./auto-entry')
const { create } = require('./sass-alias')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        entry: entries.load({ type: 'entry' }),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scripts/[name].js',
            publicPath: '/',
            clean: true
        },
        plugins: [
            ...entries.load({ type: 'view' }),
            new MiniCssExtractPlugin({
                filename : 'styles/[name].css'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    importer: create({
                                        '@styles': path.resolve(__dirname, 'styles')
                                    })
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.(?:woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[hash][ext]'
                    }
                },
                {
                    test: /\.(?:svg|webp|jpg|jpeg|png|gif|bmp|ico|avif)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext]'
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname, 'scripts'),
                '@static': path.resolve(__dirname, 'static'),
            }
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'),
            },
            compress: true,
            port: 6002,
        },
        devtool: isDevelopment ? 'inline-source-map' : false
    }
}