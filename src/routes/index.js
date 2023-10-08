const { Router } = require('express');

const doctorsRouter = require('./doctorsRouter');
// const plansRouter = require('./plansRouter');
const usersRouter = require('./usersRouter');
const datesRouter = require('./datesRouter');

const routes = Router();

routes.use('/doctors', doctorsRouter);
// routes.use('/plans', plansRouter);
routes.use('/users', usersRouter);
routes.use('/dates', datesRouter);

module.exports = routes;