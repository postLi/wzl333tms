// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    //index: path.resolve(__dirname, '../dist/index.html'),
    index: path.resolve(__dirname, '../tmpdist/index.html'),
    assetsRootTemp: path.resolve(__dirname, '../tmpdist'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map'
  },
  test: {
    env: require('./test.env')
  },
  dev: {
    env: require('./dev.env'),
    host: '192.168.1.198',
    port: 9528,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://192.168.1.79:7010',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      },
      '/157service': {
        target: 'http://192.168.1.157:7010',
        pathRewrite: {
          '^/157service': ''
        },
        changeOrigin: true
      },
      '/180service': {
        target: 'http://192.168.1.180:7010',
        pathRewrite: {
          '^/180service': ''
        },
        changeOrigin: true
      },
      '/ceshi': {
        target: 'http://192.168.1.78:7010',
        pathRewrite: {
          '^/ceshi': ''
        },
        changeOrigin: true
      },
      '/localapi': {
        target: 'http://192.168.1.233:7010',
        pathRewrite: {
          '^/localapi': ''
        },
        changeOrigin: true
      },
      '/wukunzhi': {
        target: 'http://192.168.1.42:7010',
        pathRewrite: {
          '^/wukunzhi': ''
        },
        changeOrigin: true
      },
      '/lingzhiying': {
        target: 'http://192.168.1.34:7010',
        pathRewrite: {
          '^/lingzhiying': ''
        },
        changeOrigin: true
      },
      '/huangyuwen': {
        target: 'http://192.168.1.123:7010',
        pathRewrite: {
          '^/huangyuwen': ''
        },
        changeOrigin: true
      },
      '/dingfei': {
        target: 'http://192.168.1.68:7010',
        pathRewrite: {
          '^/dingfei': ''
        },
        changeOrigin: true
      },
      '/chenrongtao': {
        target: 'http://192.168.1.127:7010',
        pathRewrite: {
          '^/chenrongtao': ''
        },
        changeOrigin: true
      },
      '/home': {
        target: 'http://frp.nanedo.com:8080',
        pathRewrite: {
          '^/home': ''
        },
        changeOrigin: true
      },
      '/fangjian': {
        target: 'http://192.168.1.25:7010',
        pathRewrite: {
          '^/fangjian': ''
        },
        changeOrigin: true
      },
      '/aliyun': {
        target: 'http://119.23.201.233:9528/api',
        pathRewrite: {
          '^/aliyun': ''
        },
        changeOrigin: true
      }
    },
    // vue-cli
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false
  }
}