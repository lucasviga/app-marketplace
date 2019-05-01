const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', controllers.UserController.store)

routes.post('/sessions', controllers.SessionController.store)

// todas as routes que estiverem abaixo de Ad seja para nao aceitar se o user
//  nao tiver autenticado
routes.use(authMiddleware)

/**
 * Ads
 */

routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchases
 */

routes.post('/purchases', controllers.PurchaseController.store)

module.exports = routes
