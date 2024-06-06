const path = require('path');

module.exports = {
    entry: {
        index: './js/index.js',
        juego: './js/juego.js',
        login: './js/login.js',
        registro: './js/registro.js',
        
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