import * as quizModel from "./quizzes.model.js";

export async function postQuiz (req, res) {
    try {
      let newQuiz = req.body;
      await quizModel.add(newQuiz);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  export async function getQuiz (req, res) {
    try {
      let quiz = await quizModel.getByName(req.params.quizName);
      res.json(quiz);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
