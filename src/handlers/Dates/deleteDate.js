const { deleteDate } = require("../../controllers/datesControllers");

const deleteDateHandler = async (req, res) => {
    try {
        const { userId, dateId } = req.body;

        //posible cambio:
        // const { userId } = req.body;
        // const { dateId } = req.params;

        // if (!userId || !dateId) {
        //     res.status(400).json({ error: 'Both userId and dateId are required' });
        // }
        //

        const date = await deleteDate(dateId, userId);
        res.status(200).json({
            status: 'deleted',
            date
        })
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = deleteDateHandler;