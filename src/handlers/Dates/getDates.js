const { checkDates } = require("../../controllers/datesControllers");


const getDates = async (req, res) => {
    try {
        const dates = await checkDates();
        res.status(200).json(dates);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
};

module.exports = getDates;