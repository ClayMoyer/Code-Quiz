let questionText = $("#questionText");
let timer = $("#timer");
let answerChoices = $("#answerChoices");
let beginQuiz = $("#beginQuiz");
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
    setQuestionText() {
        questionText.text(this.question);
    }
    setAnswerChoices() {
        answerChoices.empty();
        answerChoices.off();
        this.choices.sort((a, b) => 0.5 - Math.random());
        //double check functionality
    this.choices.forEach(answer => {
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
questionList = [questionOne, questionTwo, questionThree, questionFour, questionFive];

function startQuiz() {
    beginQuiz.remove();
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
    score = timeRemaining;
    timer.empty();
    clearInterval(timeout);
    questionText.empty();
    questionText.text("All done!");
    answerChoices.empty();
    beginQuiz.remove();
    $('#introduction').text("Your final score is " + score);

    submitInits.attr("type","text");
    submitInits.attr("id","initsInput");
    submitInits.attr("placeholder", "Enter Your Initials")
    quizHead.append(submitInits);

    submitScore.text("Submit");
    submitScore.addClass("btn");
    submitScore.attr("onclick","sendScore()")
    quizHead.append(submitScore);
}

function askQuestion(questionNumber) {
    questionList[questionNumber].setQuestionText();
    questionList[questionNumber].setAnswerChoices();
    answerChoices.on("click", "button", event => {
        selected = $(event.target);
        activeQuestion++;

        if(selected.text() != questionList[questionNumber].correctAnswer){
            timeRemaining > 10 ? timeRemaining -= 10 : timeRemaining = 0;
        }

        if(activeQuestion == questionList.length){
            endQuiz();
        } else if(activeQuestion < questionList.length) {
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

