const path = require('path')
const entries = require('./auto-entry')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        entry: entries.load({ type: 'entry' }),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scripts/[name].js',
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
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname, 'scripts'),
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