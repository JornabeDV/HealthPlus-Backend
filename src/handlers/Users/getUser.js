const { bringUserById } = require('../../controllers/usersControllers')

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await bringUserById(id);
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = getUserById;