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
        success: 'https://marvelous-phoenix-7efd24.netlify.app/home',
        failure: '',
        pending: '',
    },
    auto_return: 'approved',
    binary_mode: true,
    }
    mercadopago.preferences.create(preference)
    .then((response) => {
        // Redirigir al usuario a la URL de MercadoPago para completar el pago
        res.redirect(response.body.init_point);

        // Puedes agregar una redirección adicional a la página de inicio después del pago
        res.redirect('https://marvelous-phoenix-7efd24.netlify.app/home'); 
    })
    .catch((error) => res.status(400).send({error: error.message}))
}

module.exports = plansController;   