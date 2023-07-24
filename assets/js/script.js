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
let submitInits = $("<input>");
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
    this.options.forEach(ans => {
        let answerEl = $('<li>');
        let answerElButton = $('<button>')
        answerElButton.text(answer);
        answerElButton.addClass("btn");
        answerEl.append(answerElButton);
        answerChoices.append(answerEl);
    });
}
}

let questionOne = new Question("Arrays in JavaScript can be used to store ______", "Numbers", "Strings", "Objects", "All of the Above")
let questionTwo = new Question("Commonly used data types DO NOT include:", "Strings", "Booleans", "Numbers", "Alerts");
let questionThree = new Question("The condition in an if/else statement is enclosed with ________.", "Quotes", "Curly Brackets", "Square Brackets", "Parenthesis");
let questionFour = new Question("A very useful tool used during developmetn and debugging for printing content to the debugger is:", "JavaScript", "Terminal/Bash", "For Loops", "console.log");
let questionFive = new Question("String values must be enclosed within ______ when being assigned variables.", "Commas", "Curly Brackets", "Parenthesis", "Quotes");
quizList = [questionOne, questionTwo, questionThree, questionFour, questionFive];

function startQuiz() {
    startQuiz.remove();
    $('#introduction').empty();
    activeQuestion = 0;
    askQuestion(activeQuestion);

    timeout = setInterval(() => {
        timer.text("Time: " + timeRemaining);
        timeRemaining--;
    
        if(timeRemaining == 0){
            timer.empty();
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    score = timeLeft;
    timer.empty();
    clearInterval(timeout);
    question.empty();
    question.text("All done!");
    answerChoices.empty();
    startButton.remove();
    $('#introduction').text("Your final score is " + score);

    enterInits.attr("type","text");
    enterInits.attr("id","initsInput");
    enterInits.attr("placeholder", "Enter Your Initials")
    quizHead.append(submitInits);

    submitScore.text("Submit");
    submitScore.addClass("btn");
    submitScore.attr("onclick","submitScore()")
    quizHead.append(submitScore);
}

function askQuestion(questionNumber) {
    quizList[questionNumber].setQuestion();
    quizList[questionNumber].setAnswerChoices();
    answerChoices.on("click", "button", event => {
        selected = $(event.target);
        activeQuestion++;

        if(selected.text() != quizList[questionNumber].correctAnswer){
            timeLeft > 10 ? timeLeft -= 10 : timeLeft = 0;
        }

        //checks if the last question has been reached and ends the quiz, otherwise it proceeds to the next question
        if(activeQuestion == quizList.length){
            endQuiz();
        } else if(activeQuestion < quizList.length) {
            askQuestion(activeQuestion);
        }
        
    });
}

function sendScore() {
    let highScore = {
        "inits": submitInits.val(),
        "highScore": score
    }
    getHighScore.push(highScore);
    localStorage.setItem('highScores', JSON.stringify(getHighScore));
    window.location.href = "highScores.html";
}

function clearScores() {
    localStorage.removeItem('highScores');
    scoreList.empty();
}

//function to display the list of scores on the high score page
function displayScores() {
    getHighScore.forEach((item) => {
        let scoreEl = $('<li>');
        scoreEl.text(item.inits + " - " + item.highScore);
        scoreList.append(scoreEl);
    });
}

function viewHighScores() {
    window.location.href = "highScores.html";
}

function viewHome() {
    window.location.href = "index.html";
}

