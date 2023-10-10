const { db } = require("../firebase");

//  --- Sign up ---
const signUpUser = async ({ email, uid }) => {
  try {
    const userRef = db.collection("users").doc(uid);

    await userRef.set({
      email,
      name: "",
      id: "",
      photo: {},
      dates: [],
      rol: "user",
      enable: false,
    });

    return userRef.id; // El ID del documento es igual al UID del usuario
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// --- Bring an user from data base---

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
    // Falta tirar error al no encontrar usuario
  } catch (error) {
    console.log(error);
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
const updateUser = async (data) => {
  const { uid } = data;
  try {
    await db.collection("users").doc(uid).update(data);
    const user = await db.collection("users").doc(uid).get();
    const userData = {
      ...user.data(),
    };
    return userData;
  } catch (error) {
    throw new Error(error);
  }
};

// --- Bring user's dates ---

const bringUserDates = async (id) => {
  try {
    const userRef = await db.collection("users").doc(id).get();
    const user = {
      ...userRef.data(),
    };
    if (!user.email) throw new Error(`user with ID: ${id} not found`);
    return user.dates;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  bringUserById,
  deleteUser,
  disableUser,
  signUpUser,
  updateUser,
  enableUser,
  bringUserDates,
};
