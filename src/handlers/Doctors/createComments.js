const { putComments } = require("../../controllers/doctorsControllers");
const { reviewDoctor } = require("../../controllers/usersControllers");

const createComments = async (req, res) => {
    try {
        const { userId, doctorId, dateId, comment, date, punctuation } = req.body
        const data = {
            userId,
            doctorId,
            dateId,
            comment,
            date,
            punctuation
        }
        if (punctuation > 5 || punctuation < 1)
            throw new Error('The punctuation cannot be less than 1 or greater than 5.')
        if (comment.length === 0)
            throw new Error('The comment cannot be empty')
        
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
