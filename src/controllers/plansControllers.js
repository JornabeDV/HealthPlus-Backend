// const { db } = require('../firebase');

// // --- Bring all plans from data base ---

// const bringPlans = async () => {
//     try {
//         const allPlans = await db.collection('plans').get()

//         const plans = allPlans.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//         return plans;
//     } catch (error) {
//         throw new Error(error)
//     }
// };
// module.exports = {bringPlans};
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
        success: 'https://healthplus-soyhenry.netlify.app',
        failure: '',
        pending: '',
    },
    auto_return: 'approved',
    binary_mode: true,
    }
    mercadopago.preferences.create(preference)
    .then((response) => res.status(200).send({response}))
    .catch((error) => res.status(400).send({error: error.message}))
}

module.exports = plansController;   