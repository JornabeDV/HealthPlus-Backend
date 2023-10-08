const { disableUser } = require("../../controllers/usersControllers");


const unableUser = async (req, res) => {
    try {
        const { id } = req.params;
        const unabledUser = disableUser(id);
        res.status(202).json({
            status: 'user disabled',
            unabledUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
};

module.exports = unableUser;