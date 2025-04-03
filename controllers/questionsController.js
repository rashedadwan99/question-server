const sendQuestion = async (req, res) => {
  try {
    const { content, type, answers, matchingPairs, correctAnswer } = req.body;

    if (type === "filling" && !correctAnswer) {
      return res
        .status(400)
        .json({ error: "Filling questions must have a correctAnswer" });
    }

    const newQuestion = new Question({
      content,
      type,
      answers,
      matchingPairs,
      correctAnswer,
    });
    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("answers");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("answers");
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  sendQuestion,
  getQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
