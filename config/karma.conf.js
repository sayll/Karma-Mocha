let debug      = process.env.NODE_TEST === 'development';
module.exports = (cfg) => {
  cfg.set({
    basePath         : '../',
    // 使用的测试框架
    frameworks       : ['mocha'],
    // 需要测试的文件地址
    files            : [
      `lib/*.spec.js`,
      `test/*.spec.js`,
      {
        pattern : `test/bundler.spec.js`,
        watched : false,
        served  : true,
        included: true
      }
    ],
    // 排除的文件地址
    exclude          : [],
    // 配置预处理器,ES6代码需要预处理
    preprocessors    : {
      'test/*.spec.js': ['webpack'],
      'lib/*.spec.js' : ['webpack']
    },
    // 需要生成的代码报告
    reporters        : ['progress', 'coverage'],
    // 端口号
    port             : 9876,
    // 输出带颜色
    colors           : true,
    // 打印的消息 possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel         : cfg.LOG_INFO,
    // 是否改动代码自动刷新页面
    autoWatch        : debug,
    // 测试完成，是否关闭浏览器
    singleRun        : !debug,
    // 需要测试的浏览器
    browsers         : ['PhantomJS'],
    // 超时退出
    captureTimeout   : 60000,
    webpack          : {
      module   : {
        loaders: [{
          test   : /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader : 'babel-loader',
          query  : require('./modules/babel')
        }]
      },
      /*externals: {
        'react/addons'                  : true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext'        : true
      },*/
      devtool  : 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    },
    // 覆盖率报告要如何生成
    coverageReporter : {
      dir      : 'coverage',
      reporters: [{
        type  : 'json',
        subdir: '.',
        file  : 'coverage.json',
      }, {
        type  : 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    }
  })
}