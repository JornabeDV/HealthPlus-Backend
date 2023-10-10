const { enableUser } = require("../../controllers/usersControllers");

const enableUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await enableUser(id);
        res.status(200).json({
            status: 'enable',
            user
        })
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = enableUserHandler;