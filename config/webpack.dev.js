// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 不需要刷新浏览器的前提下模块热更新,并且能够保留react组件的状态
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');
const baseConfig = require('./webpack.base.js');
const mock = require('../mock');

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map', // 源码调试模式
    devServer: {
        port: 8071, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        static: {
            directory: path.join(__dirname, '../public'), // 托管静态资源public文件夹
        },
        // historyApiFallback: true, // 解决history路由404问题
        historyApiFallback: {
            rewrites: [{ from: /./, to: '/index.html' }],
        },
        proxy: {
            '/to_video': {
                target: 'http://127.0.0.1:12002',
                changeOrigin: true,
            },
        },
        setupMiddlewares(middlewares, devServer) {
            // 启用mock数据
            mock(devServer.app);
            return middlewares;
        },
    },
    // 去除终端logs
    stats: 'errors-only',
    plugins: [
        new ReactRefreshWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, '../public/simulate-login.html'),
        //             to: path.resolve(__dirname, '../dist'),
        //         },
        //     ],
        // }),
        // 进度条美化
        new WebpackBar({
            color: '#85d', // 默认green，进度条颜色支持HEX
            basic: false, // 默认true，启用一个简单的日志报告器
            profile: false, // 默认false，启用探查器。
        }),
    ],
});
