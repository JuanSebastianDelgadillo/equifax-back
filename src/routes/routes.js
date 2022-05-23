const { Router } = require('express');
const auth = require('../middlewares/auth');
const router = new Router();

const Usuarios = require('../controller/Usuarios');
const Tickets = require('../controller/Tickets');
const usuarios = new Usuarios();
const tickets = new Tickets();

const routes = [
    {
      method: 'get',
      path: '/getAllUsuarios',
      middleware: [auth],
      action: usuarios.getAllUsuarios
    },
    {
      method: 'post',
      path: '/newUsuario',
      middleware: [auth],
      action: usuarios.newUsuario
    },
    {
      method: 'put',
      path: '/updateUsuario/:id',
      middleware: [auth],
      action: usuarios.updateUsuario
    },
    {
      method: 'delete',
      path: '/deleteUsuario/:id',
      middleware: [auth],
      action: usuarios.deleteUsuario
    },
    {
      method: 'get',
      path: '/getUsuario/:id',
      middleware: [auth],
      action: usuarios.getUsuario
    },
    {
      method: 'get',
      path: '/getTickets',
      middleware: [auth],
      action: tickets.getTickets
    },
    {
      method: 'post',
      path: '/getLogin',
      middleware: [],
      action: usuarios.getLogin
    },
    {
      method: 'get',
      path: '/getAllTickets',
      middleware: [],
      action: usuarios.getAllTickets
      
    }
  ]
  module.exports = {
    router: routes.map(({
        method,
        path,
        middleware,
        action,
        callback = []
    }) => router[method](path, middleware, action, callback)),
    meta: routes.map(({
        method,
        path
    }) => `${method} [] ${path}`)
}