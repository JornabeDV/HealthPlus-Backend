const { bringUsers } = require("../../controllers/usersControllers");

const bringUsersHandler = async (req, res) => {
    try {
        const users = await bringUsers();
        res.status(200).json(users) 
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = bringUsersHandler;