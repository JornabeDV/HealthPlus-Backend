const { signUpUser } = require("../../controllers/usersControllers");

const createUser = async (req, res) => {
    
    try {
        const {  email, uid } = req.body;
        const photo = {
            public_id: '',
            secure_url: 'https://res.cloudinary.com/drpge2a0c/image/upload/v1697037341/userImages/blank-profile-picture-973460_960_720_sgp40b.webp'
        }
        const data = { email, uid, photo };
        const newUser = await signUpUser(data);
        res.status(201).json({
            status: 'created',
            newUser
        })
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = createUser;