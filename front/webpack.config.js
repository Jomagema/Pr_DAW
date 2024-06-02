const path = require('path');

module.exports = {
    entry: {
        http_index: './js/http/http_index.js',
        http_juego: './js/http/http_juego.js',
        http_login: './js/http/http_login.js',
        http_registro: './js/http/http_registro.js',
        constants: './js/constants.js',
        index: './js/index.js',
        juego: './js/juego.js',
        login: './js/login.js',
        registro: './js/registro.js',
        user: './js/user.js',
        
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      devServer: {
        static: path.resolve(__dirname, './'), 
        port: 8090, 
        open: {
          target: 'index.html',
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          
        },
        
      },
};