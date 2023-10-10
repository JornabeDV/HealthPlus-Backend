const { Router } = require('express');
const doctorsRouter = require('./doctorsRouter');
// const plansRouter = require('./plansRouter');
const usersRouter = require('./usersRouter');
const datesRouter = require('./datesRouter');
const mercadoPagoRouter = require('./mercadoPagoRouter');
const newsletterRouter = require('./newsletterRouter')

const routes = Router();

routes.use('/doctors', doctorsRouter);
// routes.use('/plans', plansRouter);
routes.use('/users', usersRouter);
routes.use('/dates', datesRouter);
routes.use('/payment', mercadoPagoRouter);
routes.use('/newsletter', newsletterRouter)

module.exports = routes;