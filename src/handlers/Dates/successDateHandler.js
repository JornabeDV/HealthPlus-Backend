const { successDate } = require("../../controllers/datesControllers");

const successDateHandler = async (req, res) => {
    try {
        const { userId, dateId } = req.body;
        const date = await successDate(dateId, userId);
        res.status(200).json({
            status: 'taken',
            date
        })
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = successDateHandler;