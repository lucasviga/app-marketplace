const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const controllers = require('./app/controllers')
const validators = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// todas as routes que estiverem abaixo de Ad seja para nao aceitar se o user
//  nao tiver autenticado
routes.use(authMiddleware)

/**
 * Ads
 */

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Purchase),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 */

routes.post('/purchases', handle(controllers.PurchaseController.store))

module.exports = routes
