import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'SWE_Project'), // Output directory in the root named 'dist'
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};
