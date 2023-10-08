const { deleteUser } = require("../../controllers/usersControllers");

const destroyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = deleteUser(id)
        res.status(202).json({
            status: 'deleted',
            deletedUser
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
};

module.exports = destroyUser