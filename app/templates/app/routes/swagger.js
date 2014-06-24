/* jshint unused:false */
'use strict';

var swaggerExpress = require('swagger-express')
var path = require('path')
var fs = require('fs');

module.exports = function(app) {

  var files = fs.readdirSync(path.join('app/controllers/api'))
                .filter(function(file) {
                  return (file.indexOf('.') !== 0);
                })
                .map(function(file) {
                  return 'app/controllers/api/' + file;
                });

  return swaggerExpress.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/docs',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './docs/swagger',
    basePath: 'http://localhost:3000',
    info: {
      title: 'swagger-express sample app',
      description: 'Swagger + Express = {swagger-express}'
    },
    apis: files,
    middleware: function(req, res){
      return;
    }
  });
};
