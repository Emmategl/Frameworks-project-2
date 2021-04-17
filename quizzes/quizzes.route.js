// index.js
import express from 'express'
import {postQuiz , getQuiz } from './quizzes.controler.js'

export const quizzesRouter = express.Router();

// middleware specific to this route
quizzesRouter.use(express.json())

// Create a new quiz 
quizzesRouter.post("/quizzes", postQuiz );

//Retrieve the quiz named as quizName
quizzesRouter.get("/quizzes/:quizName", getQuiz);


