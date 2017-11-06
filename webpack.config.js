var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:path.resolve(__dirname, 'src/js/main.js'),
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {test:/\.js$/, loader:'babel-loader', exclude:/node_modules/},
            {test:/\.css$/, loader:['style-loader', 'css-loader']},
            {test:/\.(png|gif|jpg|jpeg)$/, loader: 'url-loader'},
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'src/index.html'),
            filename:'index.html'
        }),
    ]
}