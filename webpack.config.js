var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

//var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '', dir)
}

module.exports = {
  entry:  ['babel-polyfill','eventsource-polyfill',resolve("/app/index.js")],//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  resolve:{    //模块的处理方案
  	extensions: ['.js', '.vue', '.json','.css','.sass'],  //默认解析扩展路径，设置完成后再引入文件后可以节约后缀名
  	modules: [resolve('public'),resolve('node_modules')],   //设置解析器查找模块的目录
    alias:{   //设置模块别名,进行简写和地址重定向
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('public'),
      'assets': path.resolve(__dirname, 'public/assets'),
    }
  	
  },
  devtool: 'none',
  devServer: {
	    contentBase: "./public", //本地服务器所加载的页面所在的目录
	    historyApiFallback: true, //不跳转
	    inline: true,
	    hot: true
	},
  module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },{
		        test: /\.vue$/,
		        loader: 'vue-loader'
		      },{
		      	test:/\.css$/,
		      	use:['style-loader', 'css-loader'],
		      }
        ]
    },
    plugins:[
    	new webpack.BannerPlugin('版权所有，翻版必究'),
    	new HtmlWebpackPlugin({
    		template: __dirname + "/public/index.html",
    		filename:'index.html',
    		showError:true,
    		hash:false
    	}),
    	new webpack.optimize.OccurrenceOrderPlugin(),   //排序输出
    	//new webpack.optimize.UglifyJsPlugin(),   //js压缩
    	//new ExtractTextPlugin("style.css")
		]
}