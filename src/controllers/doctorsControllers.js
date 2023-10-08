const { db } = require('../firebase');

// --- Bring all doctors from data base ---

const bringDoctors = async () => {
    try {
        const allDoctors = await db.collection('doctors').get()
        const doctors = allDoctors.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return doctors;

    } catch (error) {
        throw new Error(error)
    }
};

// const bringDoctorByName = async (name) => {
//     try {
//         const querySnapshot = await db.collection('doctors').where('name', '==', name).get();
//         const doctors = [];
//         querySnapshot.forEach((doc) => {
//             doctors.push({
//                 id: doc.id,
//                 ...doc.data()
//             })
//         })
//         return doctors;
//         // if (doctor.name) return doctor;
//         // else throw new Error(No doctor matched with NAME: ${name})

//     } catch (error) {
//         console.log(error);
//         throw new Error(error)
//     }
// };

// --- Bring a doctor from data base ---
// ? Siempre y cuando la propiedad isActive sea true

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

const createDoctor = async ({ name, description, enable, photo, price, specialty }) => {
    try {
        const newDoctor = await db.collection('doctors').add({
            description,
            enable,
            photo,
            name,
            price,
            specialty
        });

        return {
            status: 'created',
            doctor: newDoctor
        }
    } catch (error) {
        console.log(error);
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
        return doctors;
        // if (doctor.name) return doctor;
        // else throw new Error(`No doctor matched with NAME: ${name}`)

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
};

//? --- Delete a doctor ---

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
        console.log(error);
        throw new Error(error)
    }
}

// ? agregarle una propiedad isActive, que esta función la cambiaría a false

// routes.get('/delete-doctor/:id', async (req, res) => {
//     await db.collection('doctors').doc(req.params.id).delete()
//     res.send('doctor deleted')
// })


module.exports = { bringDoctors, bringDoctorById, createDoctor, bringDoctorByName, deleteDoctor };

