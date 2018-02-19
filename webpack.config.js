const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const cssLoader = {
    loader: 'css-loader',
    options: {
        minimize: true,
    },
};
const config = {
    output: {
        filename: '[name].js',
        chunkFilename: `[name].js`,
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['babel-loader', 'guui-svg-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                oneOf: [
                    {
                        test: /(\/__inline__)/,
                        use: ['raw-loader', 'babel-loader'],
                    },
                    {
                        use: ['babel-loader'],
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                oneOf: [
                    {
                        test: /(\/__inline__)/,
                        use: ['to-string-loader', cssLoader],
                    },
                    {
                        use: ['guui-css-loader', 'moon-css-loader'],
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            'src',
            'node_modules', // default location, but we're overiding above, so it needs to be explicit
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            // some libs expect react, this stops them bundling it
            react: 'preact',
        },
    },
    resolveLoader: {
        modules: [
            path.resolve(
                'node_modules',
                '@guardian',
                'guui',
                'dist',
                'lib',
                'loaders'
            ),
            path.resolve('tools', 'loaders'),
            'node_modules',
        ],
    },
    watchOptions: { ignored: /node_modules/ },
};

module.exports = () => {
    return webpackMerge.smart(config, {
        entry: path.join(__dirname, 'src', 'index.js'),
        output: {
            library: 'serve',
            libraryTarget: 'commonjs2',
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
    });
};
