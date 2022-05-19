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
      path: '/searchusuarios',
      middleware: [auth],
      action: usuarios.searchusuarios
    },
    {
      method: 'post',
      path: '/newClient',
      middleware: [auth],
      action: usuarios.newusuarios
    },
    {
      method: 'get',
      path: '/searchtickets',
      middleware: [auth],
      action: tickets.searchBanks
    },
    {
      method: 'get',
      path: '/searchAccountTypeAll',
      middleware: [auth],
      action: tickets.searchAccountTypeAll
    },
    {
      method: 'get',
      path: '/searchTransferHistory',
      middleware: [auth],
      action: tickets.searchTransferHistory
    },
    {
      method: 'post',
      path: '/saveTranferencia',
      middleware: [auth],
      action: tickets.saveTranferencia
    },
    {
      method: 'post',
      path: '/getLogin',
      middleware: [auth],
      action: usuarios.getLogin
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