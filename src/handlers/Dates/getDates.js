const { checkDates } = require("../../controllers/datesControllers");

const getDates = async (req, res) => {
    try {
        const { id } = req.params
        const dates = await checkDates(id);
        res.status(200).json(dates);
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = getDates;