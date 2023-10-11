const { putComments } = require("../../controllers/doctorsControllers");
const { reviewDoctor } = require("../../controllers/usersControllers");

const createComments = async (req, res) => {
    try {
        const { userId, doctorId, comment, date, punctuation } = req.body
        const data = {
            userId,
            doctorId,
            comment,
            date,
            punctuation
        }
        // Add review to doctor
        const review = await putComments(data);

        // Add review from user
        await reviewDoctor(data)
        
        res.status(201).json({
            status: 'posted',
            review
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = createComments;