module.exports = function (config) {
	config.set({
		basePath         : '',
		frameworks       : ['mocha'],
		files            : ['test/*.js'],
		exclude          : [],
		preprocessors    : {
			'test/*.js': ['webpack']
		},
		reporters        : ['progress', 'coverage'],
		port             : 9876,
		colors           : true,
		logLevel         : config.LOG_INFO,
		autoWatch        : false,
		singleRun        : true,
		browsers         : ['PhantomJS'],
		captureTimeout   : 60000,
		webpack          : {
			module: {
				loaders: [{
					test   : /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader : 'babel-loader',
					query  : {
						presets: ['es2015'],
						plugins: ['istanbul']
					}
				}]
			}
		},
		webpackMiddleware: {
			noInfo: true
		},
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