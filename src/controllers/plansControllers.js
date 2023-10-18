const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-8033250124943304-100419-9f5940470a6ee188e569925fef444342-1500823282'
})

const plansController = (req, res) => {
    const product = req.body;

    const preference = {
        items: [{
            id: 1,
            title: product.title,
            currency_id: 'ARS',
            picture_url: product.image,
            description: product.description,
            category_id: 'art',
            quantity: 1,
            unit_price: product.price
    }],
    back_urls: {
        success: 'https://healthplus-henry.netlify.app/confirm',
        failure: 'https://healthplus-henry.netlify.app/',
        pending: 'https://healthplus-henry.netlify.app/',
    },
    auto_return: 'approved',
    
    }
    mercadopago.preferences.create(preference)
    .then((response) => res.status(200).send({response}))
    .catch((error) => res.status(400).send({error: error.message}))
}

module.exports = plansController;