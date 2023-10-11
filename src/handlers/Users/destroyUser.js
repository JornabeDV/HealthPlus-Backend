const { deleteUser } = require("../../controllers/usersControllers");
const { deleteImage } = require("../../../utils/cloudinary");

const destroyUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete user
        const deletedUser = await deleteUser(id);
        // Delete cloudinary image
        if (deletedUser.photo?.public_id) {
            await deleteImage(deletedUser.photo.public_id);
        };
        res.status(202).json({
            status: 'deleted',
            deletedUser
        });
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = destroyUser;