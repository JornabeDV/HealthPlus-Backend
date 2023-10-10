require('dotenv').config();
const { Router } = require('express');
const mercadoPagoRouter = Router();
const plansController = require('../controllers/plansControllers');


mercadoPagoRouter.post('/', plansController);


module.exports = mercadoPagoRouter;