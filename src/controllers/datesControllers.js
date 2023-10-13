const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../firebase");
const sendEmail = require("./emailSenderControllers");

// --- Create a Date ---

const createDate = async ({ userId, doctorId, date, schedule, email }) => {
  try {
    const doctorData = await db.collection("doctors").doc(doctorId).get();
    const doctor = {
      ...doctorData.data(),
    };
    if (!doctor.name) throw new Error(`No doctor matched with ID: ${doctorId}`);

    const userData = await db.collection("users").doc(userId).get();

    const user = {
      ...userData.data(),
    };

    if (!user.email)
      throw new Error(`No user matched with ID: ${userId}`);
    if (!user.enable)
      throw new Error(`User with ID: ${userId} is not subscribed`);
    if (!user.name || !user.lastName || !user.userId || !user.date)
      throw new Error('All profile information must be completed in order to make an appointment.')

    const newDate = {
      user: user.name,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date,
      schedule,
      status: "pending",
    };

    const collectionRef = await db.collection("dates").add(newDate);

    newDate.id = collectionRef.id;

    // Add appointment to user
    await db.collection("users").doc(userId).update({
      dates: FieldValue.arrayUnion(newDate),
    });

    // Add appointment to doctor
    await db.collection('doctors').doc(doctorId).update({
      dates: FieldValue.arrayUnion(newDate),
    })

    // send mail 
    await sendEmail(email, doctor, date, schedule, user);

    return {
      status: "created",
      newDate,
    };
  } catch (error) {
    throw new Error(error);
  }
};

// --- check availability ---

const checkDates = async (id) => {
  try {
    const doctorRef = await db.collection('doctors').doc(id).get();
    const doctorData = {
      ...doctorRef.data()
    };
    const doctorDates = doctorData.dates.filter(date => date.status === 'pending');
    return doctorDates
  } catch (error) {
    throw new Error(error);
  }
};

// --- Cancel a Date ---

const cancelDate = async (dateId, userId, doctorId) => {
  try {
    const dateRef = await db.collection("dates").doc(dateId).get();
    const date = {
      id: dateRef.id,
      ...dateRef.data(),
    };
    const userRef = await db.collection("users").doc(userId).get();
    const user = {
      ...userRef.data(),
    };
    if (!user.email) throw new Error(`User with ID: ${userId} not found`);

    const filteredDates = user.dates.filter((date) => date.id !== dateId);

    if (date.status === "canceled")
      throw new Error(`date with ID: ${dateId} has been already canceled`);
    if (date.status === "taken")
      throw new Error(`date with ID: ${dateId} has been already taken`);
    else date.status = "canceled";

    if (date.doctor) {
      await db.collection("dates").doc(dateId).update({
        status: "canceled",
      });
    } else throw new Error(`date with id ${dateId} not found`);

    filteredDates.push(date);

    // Canceling user's appointment  
    await db.collection("users").doc(userId).update({
      dates: filteredDates
    });

    // Canceling doctor's appointment 
    await db.collection('doctors').doc(doctorId).update({
      dates: filteredDates
    })

  } catch (error) {
    throw new Error(error);
  }
};

// --- Finish a date ---

const successDate = async (dateId, userId, doctorId) => {
  try {
    const dateRef = await db.collection("dates").doc(dateId).get();
    const date = {
      id: dateRef.id,
      ...dateRef.data(),
    };
    const userRef = await db.collection("users").doc(userId).get();
    const user = {
      ...userRef.data(),
    };
    if (!user.email) throw new Error(`User with ID: ${userId} not found`);

    const filteredDates = user.dates.filter((date) => date.id !== dateId);

    if (date.status === "taken")
      throw new Error(`date with ID: ${dateId} already taken`);
    if (date.status === "canceled")
      throw new Error(`date with ID: ${dateId} has been canceled`);
    else date.status = "taken";

    // Adding review posibility
    date.reviewed = false;

    filteredDates.push(date);

    // Marking user's date as taken
    await db.collection("users").doc(userId).update({
      dates: filteredDates,
    });

    // Marking doctor's date as taken
    await db.collection("doctors").doc(doctorId).update({
      dates: filteredDates,
    });

    if (date.doctor) {
      await db.collection("dates").doc(dateId).update({
        status: "taken",
      });
      return date;
    } else throw new Error(`date with id ${dateId} not found`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createDate, checkDates, cancelDate, successDate };