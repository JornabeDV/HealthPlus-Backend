const { deleteImage } = require('../../utils/cloudinary');
const { db } = require('../firebase');

const { FieldValue } = require('firebase-admin/firestore');

// --- Bring all doctors from data base ---

const bringDoctors = async () => {
    try {
        const allDoctors = await db.collection('doctors').where('enable', '==', true).get()
        const doctors = allDoctors.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return doctors;

    } catch (error) {
        throw new Error(error)
    }
};

// --- Bring a doctor from data base ---

const bringDoctorById = async (id) => {
    try {
        const doc = await db.collection('doctors').doc(id).get()
        const doctor = {
            id: doc.id,
            ...doc.data()
        };
        if (doctor.name) return doctor;
        else throw new Error(`No doctor matched with ID: ${id}`)

    } catch (error) {
        throw new Error(error)
    }
};

// --- Create a new doctor ---

const createDoctor = async (data) => {
    try {
        await db.collection('doctors').add({
            ...data,
            enable: true,
            rol: 'doctor',
            comments: [],
            dates: []
        });
        const doctor = {
            ...data
        }
        return doctor
    } catch (error) {
        throw new Error(error)
    }
};

// --- Bring doctor by name ---

const bringDoctorByName = async (name) => {
    try {
        const querySnapshot = await db.collection('doctors').where('name', '==', name).get();
        const doctors = [];
        querySnapshot.forEach((doc) => {
            doctors.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return doctors

    } catch (error) {
        throw new Error(error)
    }
};

// --- Delete a doctor ---

const deleteDoctor = async (id) => {
    try {
        const doc = await db.collection('doctors').doc(id).get();
        const doctor = {
            id: doc.id,
            ...doc.data()
        };
        if (doctor.name) {
            await db.collection('doctors').doc(id).delete();
            return doctor;
        } else throw new Error(`doctor with id ${id} not found`);

    } catch (error) {
        throw new Error(error)
    }
}

// --- Disable a doctor ---

const disableDoctor = async (id) => {
    try {
        const disabledDoctor = await db.collection('doctors').doc(id).get();
        const doctor = {
            id: disabledDoctor.id,
            ...disabledDoctor.data()
        }
        if (!doctor.name) throw new Error(`doctor with ID ${id} not found`);
        if (!doctor.enable) throw new Error(`doctor with ID ${id} already disabled`);

        await db.collection('doctors').doc(id).update({
            enable: false
        });
        doctor.enable = false;
        return doctor;

    } catch (error) {
        throw new Error(error)
    }
};

// --- Enable a doctor ---

const enableDoctor = async (id) => {
    try {
        const enabledDoctor = await db.collection('doctors').doc(id).get();
        const doctor = {
            id: enabledDoctor.id,
            ...enabledDoctor.data()
        }
        if (!doctor.name) throw new Error(`doctor with id ${id} not found`);
        if (doctor.enable) throw new Error(`doctor with ID ${id} already enabled`);

        await db.collection('doctors').doc(id).update({
            enable: true
        });
        doctor.enable = true;
        return doctor;

    } catch (error) {
        throw new Error(error)
    }
};

const putComments = async ({ userId, doctorId, dateId, date, comment, punctuation }) => {
    try {
        const userRef = await db.collection('users').doc(userId).get()
        user = {
            ...userRef.data()
        };

        const review = {
            date,
            userName: `${user.name} ${user.lastName}`,
            comment,
            punctuation
        }

        const doctorRef = await db.collection('doctors').doc(doctorId).get()

        const doctor = {
            ...doctorRef.data()
        }

        const reviewedDate = doctor.dates.find(date => date.id === dateId);
        if (reviewedDate.reviewed === true)
            throw new Error('the appointment has already been reviewed')
        reviewedDate.reviewed = true;

        const filteredDates = doctor.dates.filter(date => date.id !== dateId);
        filteredDates.push(reviewedDate);

        db.collection('doctors').doc(doctorId).update({
            comments: FieldValue.arrayUnion(review),
            dates: filteredDates
        })
        return review
    } catch (error) {
        throw new Error(error)
    }
};

// --- Edit doctor info ---
const updateDoctor = async (id, data) => {
    try {
        const doctorRef = await db.collection('doctors').doc(id).get();

        const doctor = {
            ...doctorRef.data()
        };
        if (!doctor.name) throw new Error(`doctor with id ${id} not found`);

        // Delete cloudinary image only if it's not the placeholder
        if (doctor.photo?.public_id ||
            doctor.photo.secure_url !== 'https://res.cloudinary.com/drpge2a0c/image/upload/v1697037341/userImages/blank-profile-picture-973460_960_720_sgp40b.webp') {
            await deleteImage(doctor.photo.public_id);
        };
        await db.collection('doctors').doc(id).update(data);
        return {
            data
        };
    } catch (error) {
        throw new Error(error)
    }
};


module.exports = { putComments, bringDoctors, bringDoctorById, createDoctor, bringDoctorByName, deleteDoctor, disableDoctor, enableDoctor, updateDoctor };