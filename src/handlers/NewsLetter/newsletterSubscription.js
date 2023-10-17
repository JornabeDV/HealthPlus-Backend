const sendEmailNewsletter = require('../../controllers/newsletterEmailSubscription');

const newsletterSubscription = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw new Error('Email field is required')

        await sendEmailNewsletter(email);
        res.status(200).json({
            message: 'You have successfully subscribed to our newsletter!'
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = newsletterSubscription;