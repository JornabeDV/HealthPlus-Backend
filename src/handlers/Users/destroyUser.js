const { deleteUser } = require("../../controllers/usersControllers");

const destroyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id);
        res.status(202).json({
            status: 'deleted',
            deletedUser
        });
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = destroyUser;