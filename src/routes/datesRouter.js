const { Router } = require("express");


const postDate = require('../handlers/Dates/postDate');
const getDates = require('../handlers/Dates/getDates');
const cancelDateHandler = require('../handlers/Dates/cancelDate');
const successDateHandler = require('../handlers/Dates/successDateHandler');

const datesRouter = Router();

datesRouter.post('/', postDate);
datesRouter.get('/:id', getDates);
datesRouter.put('/success', successDateHandler)
datesRouter.put('/cancel', cancelDateHandler);


module.exports = datesRouter;
