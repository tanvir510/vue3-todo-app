// vue.config.js
module.exports = {
	lintOnSave: false,
	devServer: {
		disableHostCheck: true,
		port: 4000,
		public: '0.0.0.0:4000',
	},
	publicPath: '/',
};
