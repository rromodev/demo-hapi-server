'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: function () {

    return 'Hello World!';
  }
});

server.route({
  method: 'GET',
  path: '/demo',
  handler: async (request, h) => {
    const p = require('phin')
    const result = await p({
      url: 'https://reqres.in/api/users/1',
      parse: 'json'
    })
    return result.body
  }
});

exports.init = async () => {

  await server.initialize();
  return server;
};

exports.start = async () => {

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});