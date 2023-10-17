const { createDate } = require('../../controllers/datesControllers');

const postDate = async (req, res) => {
    try {
        const { userId, doctorId, date, schedule, email } = req.body;
        if (!userId || !doctorId || !date || !schedule || !email) throw new Error('Missing information to create new date');

        const data = { userId, doctorId, date, schedule, email };
        const newDate = await createDate(data);
        res.status(201).json(newDate);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
};

module.exports = postDate;
