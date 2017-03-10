const path = require('path');

const BASE_CSS_LOADER = 'css?sourceMap&-minimize';

module.exports = {
    module: {
        entry: {
            app: ['bootstrap-loader']
        },
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    BASE_CSS_LOADER,
                    'postcss',
                    'sass?sourceMap'
                ],
                 include: path.resolve(__dirname, '../app/components')
            },
            {
                test: /\.css?$/,
                loaders: [
                    'style',
                    BASE_CSS_LOADER,
                    'postcss'
                ],
                include: path.resolve(__dirname, '../')
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
        ]
    }
}
