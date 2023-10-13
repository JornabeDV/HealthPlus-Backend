const { deleteUser } = require("../../controllers/usersControllers");
const { deleteImage } = require("../../../utils/cloudinary");

const destroyUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete user
        const deletedUser = await deleteUser(id);

        // Delete cloudinary image only if it's not the placeholder
        if (deletedUser.photo?.public_id ||
            deletedUser.photo.secure_url !== 'https://res.cloudinary.com/drpge2a0c/image/upload/v1697037341/userImages/blank-profile-picture-973460_960_720_sgp40b.webp'
            ) {
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