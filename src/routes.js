const express = require('express')
const validate = require('express-validation')

const routes = express.Router()

const controllers = require('./app/controllers')
const validators = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth')

routes.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)

routes.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

// todas as routes que estiverem abaixo de Ad seja para nao aceitar se o user
//  nao tiver autenticado
routes.use(authMiddleware)

/**
 * Ads
 */

routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put(
  '/ads/:id',
  validate(validators.Purchase),
  controllers.AdController.update
)
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchases
 */

routes.post('/purchases', controllers.PurchaseController.store)

module.exports = routes
