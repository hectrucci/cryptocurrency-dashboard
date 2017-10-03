const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin({filename: 'app.css', allChunks: true});

module.exports = options => {
    const config = {

        entry: [
            'bootstrap-loader/extractStyles',
            './client/src/containers/App.js',
        ],
        output: {
            path: __dirname + '/client/build',
            filename: 'app.js',
        },
        devtool: 'source-map',
        resolve: {
            modules: ['node_modules'],
            descriptionFiles: ['package.json'],
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
                {
                test: /\.css$/,
                    use: extractStyles.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: extractStyles.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'sass-loader',
                        ],
                    }),
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/font-woff',
                                name: 'fonts/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg|png)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            extractStyles,
        ],
    };

    if (process.env.NODE_ENV === 'production') {
        const buildDir = `${__dirname}/client/build`;
        const cleanDist = new CleanPlugin([buildDir], { verbose: false });

        config.plugins.push(cleanDist);
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: true,
        }));
    }

    return config;
}
