'use strict';
const Path = require('path');

const Hoek = require('hoek');
const Hapi = require('hapi');

const handlers = require('./lib/handlers');

let server = new Hapi.Server();

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

server.route(routes.fileUpload);

server.route(routes.default);

server.route(routes.readFile);

let routes =  {
  readFile : {
    method: 'GET',
    path: '/readFile',
    handler: handlers.readFile
  },
  fileUpload : {
    method: 'POST',
    path: '/fileUpload',
    handler: handlers.fileUpload
  },
  default : {
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
  }  
};