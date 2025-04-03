const sendAnswer = async (req, res) => {
  try {
    const { content, questionId, isCorrect } = req.body;

    // Check if the question exists
    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    const newAnswer = new Answer({ content, questionId, isCorrect });
    await newAnswer.save();

    // Add answer to the question's answers array
    question.answers.push(newAnswer._id);
    await question.save();

    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate("questionId");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOneAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate("questionId");
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateAnswer = async (req, res) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAnswer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    // Remove answer from the associated question
    await Question.findByIdAndUpdate(answer.questionId, {
      $pull: { answers: answer._id },
    });

    await Answer.findByIdAndDelete(req.params.id);
    res.json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  sendAnswer,
  getAnswers,
  getOneAnswer,
  updateAnswer,
  deleteAnswer,
};
