'use strict';
const Path = require('path');

const Hoek = require('hoek');
var Hapi = require('hapi');

const handlers = require('./lib/handlers');

var server = new Hapi.Server();

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

server.connection({port: 3000});

server.start(function(){
  console.log('Listening on '+ server.info.uri);
});

server.route({
  method: 'POST',
  path: '/fileUpload',
  handler: handlers.fileUpload
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: {
      template: 'index',
      context: {
        message: ""
      }
    }
  }
  //handlers.default
});

server.route({
  method: 'GET',
  path: '/readFile',
  handler: handlers.readFile
});

