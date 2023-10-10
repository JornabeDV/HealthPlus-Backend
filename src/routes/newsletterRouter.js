const  newsletterSubscription  = require('../handlers/NewsLetter/newsletterSubscription');
const { Router } = require('express');

const newsletterRouter = Router();

newsletterRouter.post('/', newsletterSubscription);

module.exports = newsletterRouter;
