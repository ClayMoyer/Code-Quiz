let question = $("#question");
let timer = $("#timer");
let answerChoices = $("#answerChoices");
let startButton = $("#startButton");
let quizHead = $("#quizHead");
let scoreList = $("#scoreList");
let timeRemaining = 60;
let score = 0;
let getHighScore = JSON.parse(localStorage.getItem('highScores') || "[]");
let submitScore = $("<button></button>");
let submitName = $("<input>");
let timeout;

let questionList = [];
let activeQuestion;
class Question {
    constructor(question, answerA, answerB, answerC, correctAnswer) {
        this.question = question;
        this.choices = [answerA, answerB, answerC, correctAnswer];
        this.correctAnswer = correctAnswer;
    }
    setQuestion() {
        question.text(this.question);
    }
    setAnswerChoices() {
        answerChoices.empty();
        answerChoices.off();
        this.options.sort((a, b) => Math.floor(Math.random() * this.options.length));
        //double check functionality
    }
}

function viewHighScores() {
    window.location.href = "highScores.html";
}

function viewHome() {
    window.location.href = "index.html";
}

