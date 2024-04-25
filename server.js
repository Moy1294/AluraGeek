const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'public'  // Asegúrate de que tu carpeta de archivos estáticos se llame 'public'
});

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(express.static(path.join(__dirname, 'public')));  // Sirve los archivos estáticos
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
