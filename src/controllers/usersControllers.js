const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../firebase");

//  --- Sign up ---

const signUpUser = async ({ email, uid, photo }) => {
    try {
        const userRef = db.collection('users').doc(uid);

        await userRef.set({
            email,
            name: '',
            userId: '',
            photo,
            dates: [],
            rol: 'user',
            enable: false,
            reviews: []
        });

        const newUser = {
            email,
            uid
        }
        return newUser;
    } catch (error) {
        throw new Error(error);
    }

};

//   --- Bring all users ---
const bringUsers = async () => {

    try {
        const allUsers = await db.collection('users').get();
        const users = allUsers.docs.map((user) => ({
            id: user.id,
            ...user.data()
        }))
        return users
    } catch (error) {
        throw new Error(error)
    }


};
// --- Bring an user by name from data base --
const bringUserByName = async (name) => {
    try {
        const querySnapshot = await db.collection('users').where('name', '==', name).get();
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return users;
    } catch (error) {
        throw new Error(error)
    }
}


// --- Bring an user by id from data base ---

const bringUserById = async (id) => {

    try {
        const userData = await db.collection("users").doc(id).get();
        const user = {
            id: userData.id,
            ...userData.data(),
        };
        if (!user.email) throw new Error(`No user matched with UID: ${id}`);
        user.image = user.photo.secure_url;
        return user;
    } catch (error) {
        throw new Error(error);
    }

};

// --- Delete an user from data base ---

const deleteUser = async (id) => {

    try {
        const userRef = await db.collection('users').doc(id).get();
        const user = {
            id: userRef.id,
            ...userRef.data()
        }
        if (!user.email) throw new Error(`No user matched with UID: ${id}`)
        await db.collection('users').doc(id).delete()
        return user
    } catch (error) {
        throw new Error(error)
    }
}
// --- Enable an user ---

const enableUser = async (id) => {
  try {
    const enabledUser = await db.collection("users").doc(id).get();
    const user = {
      id: enabledUser.id,
      ...enabledUser.data(),
    };
    if (!user.email) throw new Error(`user with id ${id} not found`);
    if (user.enable) throw new Error(`user with ID ${id} already enabled`);

    await db.collection("users").doc(id).update({
      enable: true,
    });
    user.enable = true;
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// --- Disable an user from data base ---

const disableUser = async (id) => {
  try {
    const disabledUser = await db.collection("users").doc(id).get();
    const user = {
      id: disabledUser.id,
      ...disabledUser.data(),
    };
    if (!user.email) throw new Error(`user with ID ${id} not found`);
    if (!user.enable) throw new Error(`user with ID ${id} already disabled`);

    await db.collection("users").doc(id).update({
      enable: false,
    });
    user.enable = false;
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
//  --- Update user ---
const updateUser = async (uid, data) => {
    try {
        const userRef = await db.collection('users').doc(uid).get();

        const user = {
            ...userRef.data()
        };
        if (!user.email) throw new Error(`user with di: ${uid} not found`);

        // Delete cloudinary image only if it's not the placeholder
        if (user.photo?.public_id ||
            user.photo.secure_url !== 'https://res.cloudinary.com/drpge2a0c/image/upload/v1697037341/userImages/blank-profile-picture-973460_960_720_sgp40b.webp') {
            await deleteImage(user.photo.public_id);
        };

        // delete
        await db.collection("users").doc(uid).update(data);
        return {
            data
        }
    } catch (error) {
        throw new Error(error);
    }

};


// --- Post a review ---

const reviewDoctor = async ({ userId, doctorId, comment, punctuation, date }) => {
    try {
        const review = {
            doctorId,
            comment,
            date,
            punctuation
        }
        await db.collection('users').doc(userId).update({
            reviews: FieldValue.arrayUnion(review)
        })
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = { bringUsers, bringUserById, deleteUser, disableUser, signUpUser, updateUser, enableUser, reviewDoctor, bringUserByName }