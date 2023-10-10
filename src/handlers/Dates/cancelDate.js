const { cancelDate } = require("../../controllers/datesControllers");

const cancelDateHandler = async (req, res) => {
    try {
        const { userId, dateId } = req.body;
        const date = await cancelDate(dateId, userId);
        res.status(200).json({
            status: 'canceled',
            date
        })
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = cancelDateHandler;