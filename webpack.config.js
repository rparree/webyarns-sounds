const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')

module.exports = (env, argv) => {
    const version = process.env.npm_package_version
    const isDevMode = argv.mode === 'development';
    console.log("development mode: ", isDevMode)

    const babelPlugins = [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
    console.log("ENV", argv.mode);
    if (argv.mode === 'production') {
        babelPlugins.push(['transform-remove-console', {exclude: ['error', 'warn']}]);
    }
    const devtool = argv.mode === 'production' ? "source-map" : "eval";
    return {
        resolve: {
            extensions: ['.ts', '.js'],
        },
        mode: "development",
        entry: {
            'webyarns-sounds': {
                import: "./src/webyarns-sound.ts",
                library: {
                    name: "WebyarnsSounds",
                    type: "umd"
                },
                filename: `webyarns-sounds-${version}.js`,
            },
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
        },
        devtool,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ['@babel/preset-env', {targets: "defaults"}],
                                "@babel/typescript"
                            ],
                            "plugins": babelPlugins,

                        }
                    }
                },
            ]
        },
        plugins: [
            new GitRevisionPlugin(),
            new HtmlWebpackPlugin({
                template: "loop.html",
                scriptLoading: "blocking",
                inject: "head",
                filename: "loop.html"
            }),
            new HtmlWebpackPlugin({
                template: "various.html",
                scriptLoading: "blocking",
                inject: "head",
                filename: "various.html"
            }),
            new CopyPlugin({

                patterns: [
                    {
                        from: "index.html",
                        to: "index.html",
                    },
                    {
                        from: "sounds",
                        to: "sounds",
                    },
                    {
                        from: "node_modules/webyarns-reveal/js",
                        to: "js"
                    },
                    {
                        from: "node_modules/webyarns-reveal/webyarns-util/lib",
                        to: "js"
                    },
                    {
                        from: "node_modules/webyarns-reveal/css",
                        to: "css"
                    },
                ],

            }),
            new webpack.BannerPlugin({
                banner: `version: ${version}\n`
            }),
        ],
        devServer: {
            port: 9090,
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                })
            ]
        }
    }
};
