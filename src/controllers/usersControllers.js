const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../firebase");

//  --- Sign up ---

const signUpUser = async ({ email, uid, photo }) => {
  try {
    const userRef = db.collection("users").doc(uid);

    await userRef.set({
      email,
      name: "",
      lastName: "",
      userId: "",
      photo,
      dates: [],
      rol: "user",
      enable: false,
      reviews: [],
    });

    const newUser = {
      email,
      uid,
    };
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const bringUserDates = async (id) => {
  try {
    const userRef = await db.collection("users").doc(id).get();
    const userData = {
      ...userRef.data(),
    };
    if (!userData.email) throw new Error(`User with ID: ${id} not found`);
    const userDates = userData.dates;
    return userDates;
  } catch (error) {
    throw new Error(error);
  }
};

//   --- Bring all users ---
const bringUsers = async () => {
  try {
    const allUsers = await db.collection("users").get();
    const users = allUsers.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }));
    return users;
  } catch (error) {
    throw new Error(error);
  }
};
// --- Bring an user by name from data base --
const bringUsersByName = async (name) => {
  try {
    const userRef = await db.collection("users").get();
    const users = [];
    userRef.forEach((user) => {
      users.push({
        id: user.id,
        ...user.data(),
      });
    });
    const lowerName = name.toLowerCase();
    const matchUsers = [];
    users.forEach((user) => {
      if (
        user.name.toLowerCase().includes(lowerName) ||
        user.lastName.toLowerCase().includes(lowerName)
      ) {
        matchUsers.push(user);
      }
    });
    return {
      usersMatched: matchUsers.length,
      matchUsers,
    };
  } catch (error) {
    throw new Error(error);
  }
};

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
    const userRef = await db.collection("users").doc(id).get();
    const user = {
      id: userRef.id,
      ...userRef.data(),
    };
    if (!user.email) throw new Error(`No user matched with UID: ${id}`);
    await db.collection("users").doc(id).delete();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
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
    const userRef = await db.collection("users").doc(uid).get();

    const user = {
      ...userRef.data(),
    };
    if (!user.email) throw new Error(`user with di: ${uid} not found`);

    // Delete cloudinary image only if it's not the placeholder
    if (
      user.photo?.public_id ||
      user.photo.secure_url !==
        "https://res.cloudinary.com/drpge2a0c/image/upload/v1697037341/userImages/blank-profile-picture-973460_960_720_sgp40b.webp"
    ) {
      await deleteImage(user.photo.public_id);
    }

    // delete
    await db.collection("users").doc(uid).update(data);
    return {
      data,
    };
  } catch (error) {
    throw new Error(error);
  }
};

// --- Post a review ---
const reviewDoctor = async ({
  userId,
  doctorId,
  dateId,
  comment,
  punctuation,
  date,
}) => {
  try {
    const review = {
      doctorId,
      comment,
      date,
      punctuation,
    };

    const userRef = await db.collection("users").doc(userId).get();

    const user = {
      ...userRef.data(),
    };

    const reviewedDate = user.dates.find((date) => date.id === dateId);
    if (reviewedDate.reviewed === true)
      throw new Error("the appointment has already been reviewed");
    reviewedDate.reviewed = true;
    reviewedDate.status = "reviewed";

    const filteredDates = user.dates.filter((date) => date.id !== dateId);
    filteredDates.push(reviewedDate);

    db.collection("users")
      .doc(userId)
      .update({
        reviews: FieldValue.arrayUnion(review),
        dates: filteredDates,
      });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  bringUsers,
  bringUserById,
  bringUserDates,
  deleteUser,
  disableUser,
  signUpUser,
  updateUser,
  enableUser,
  bringUsersByName,
  reviewDoctor,
};