const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(express.static(path.join(__dirname, 'public')));  // Sirve los archivos estáticos desde 'public'
server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
