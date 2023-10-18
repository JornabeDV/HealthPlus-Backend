const { putComments } = require("../../controllers/doctorsControllers");
const { reviewDoctor } = require("../../controllers/usersControllers");

const createComments = async (req, res) => {
  //   try {
  const { userId, doctorId, dateId, comment, date, punctuation } = req.body;
  const data = {
    userId,
    doctorId,
    dateId,
    comment,
    date,
    punctuation,
  };
  console.log(req.body);
  if (comment === undefined) {
    throw new Error("The comment field is missing in the request.");
  }

  if (comment.length === 0) {
    throw new Error("The comment cannot be empty");
  }

  // Add review to doctor
  const review = await putComments(data);

  // Add review from user
  await reviewDoctor(data);

  res.status(201).json({
    status: "posted",
    review,
  });
  //   } catch (error) {
  //     res.status(400).json(error.message);
  //   }
};

module.exports = createComments;