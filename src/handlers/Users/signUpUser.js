const { signUpUser } = require("../../controllers/usersControllers");

const createUser = async (req, res) => {
    try {
        const {  email, uid } = req.body;
        const data = { email, uid };
        const newUser = signUpUser(data);
        res.status(201).json({
            status: 'created',
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

module.exports = createUser;