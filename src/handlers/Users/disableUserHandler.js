const { disableUser } = require("../../controllers/usersControllers");

const disableUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await disableUser(id);
        res.status(200).json({
            status: 'disabled',
            user
        })
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = disableUserHandler;