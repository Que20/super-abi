const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        fs: require.resolve('fs'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    return config;
}