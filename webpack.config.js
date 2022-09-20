const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devServer: {static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9000
    },
    entry: './js/game.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]'
    },

    module : {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpg)$/, type: 'asset'},
            { test: /\.mp3$/, loader: 'file-loader', options: {
                outputPath: 'audio'
            }}
        ]
    },
    plugins: [ new HtmlWebpackPlugin({
        title: 'Flappy Bird',
        favicon: 'img/bird.png',
        templateContent: `
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
            </head>
            <body id="body">
                <div class="display" id="display">
                    <div class="mainmenu">
                        <h1>Flappy Bird</h1>
                        <div class="buttons">
                            <button id="play-btn">Играть</button>
                            <button class="rules-btn" onclick="alert('Управление осуществляется при помощи клавиши &quot;Пробел&quot;. Цель игры: Пройти через наибольшее количество труб.')">Правила</button>
                        </div>
                        <div class="points">
                            <p>Рекорд по очкам за сессию: </p>
                            <div class="point" id="point"></div>
                        </div>
                        <div class="author">
                            <p onclick="nw.Shell.openExternal('http://wo0b.site');">Сделано WOZEROBE</p>
                        </div>
                    </div>
                </div>
                <div class="close-btn" onclick="nw.App.quit()">
                    <i class="uil uil-multiply"></i>
                </div>
            
                <canvas id="canvas" width="512px" height="512px" class="dnone"></canvas>
            </body>
            </html>
        `
    }), new CleanWebpackPlugin()]
}