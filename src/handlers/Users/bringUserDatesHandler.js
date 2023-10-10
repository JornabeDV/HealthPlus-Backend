const { bringUserDates } = require("../../controllers/usersControllers");

const bringUserDatesHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const dates = await bringUserDates(id);
        res.status(200).json(dates)
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = bringUserDatesHandler;