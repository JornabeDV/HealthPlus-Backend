const { bringUsers, bringUserByName } = require("../../controllers/usersControllers");

const bringUsersHandler = async (req, res) => {

    const { name } = req.body;

    if (name) {
        try {
            const user = await bringUserByName(name);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json(error.message)
        }
    } else {
        try {
            const users = await bringUsers();
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
};

module.exports = bringUsersHandler;