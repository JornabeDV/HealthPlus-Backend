const { logInUser } = require("../../controllers/usersControllers");

const logInHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await logInUser(email, password);
        console.log(response);
        res.status(202).send(response);
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message)
    }
};

module.exports = logInHandler