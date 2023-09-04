// webpack.base.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isDev, ENV } = require('./webpack.utils');

module.exports = {
    entry: path.join(__dirname, '../src/index.jsx'),
    // 打包文件出口
    output: {
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        filename: '[name].[contenthash:8].js',
        clean: true,
        publicPath: isDev ? '/' : '/', // 打包后文件的公共前缀路径
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                include: [path.resolve(__dirname, '../src')], // 只对项目src文件的js, jsx进行loader解析
                use: [
                    'thread-loader', // 开启多线程解析 js文件
                    {
                        loader: 'babel-loader',
                        // 执行顺序由右往左处理jsx,最后再试一下babel转换为低版本语法
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage', // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                                        corejs: 3, // 配置使用core-js低版本
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
                exclude: '/node_modules/',
            },
            // .(css|less)$ 拆分是为了避免让less-loader再去解析css文件
            {
                test: /.css$/, // 匹配所有的 css 文件
                // include: [path.resolve(__dirname, '../src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /.less$/, // 匹配所有的 less 文件
                include: [path.resolve(__dirname, '../src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: '[name].[contenthash:8][ext]',
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: '[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: '[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            // favicon: path.resolve(__dirname, '../public/favicon.ico'),
            inject: true, // 自动注入静态资源
        }),
        // 让react不需要在每个jsx文件上引用
        new webpack.ProvidePlugin({ React: 'react' }),
        // process.env.NODE_ENV环境变量webpack会自动根据设置的mode字段来给业务代码注入对应的development和prodction
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
        }),
        new webpack.DefinePlugin({ env: `${JSON.stringify(ENV)}` }),
    ].filter(Boolean), // 过滤空值
    // 打包持久化
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    resolve: {
        // 使用别名
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        // 引入文件的时候，省略后缀
        extensions: ['.js', '.jsx', '.less', '.css'],
        modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    },
};
