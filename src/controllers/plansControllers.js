// const { db } = require('../firebase');

// // --- Bring all plans from data base ---

// const bringPlans = async () => {
//     try {
//         const allPlans = await db.collection('plans').get()

//         const plans = allPlans.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//         return plans;
//     } catch (error) {
//         throw new Error(error)
//     }
// };
// module.exports = {bringPlans};