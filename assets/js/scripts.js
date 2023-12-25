const startBtn = document.querySelector("#start_button");
const quizEl = document.querySelector("#quiz");
const submitBtn = document.querySelector("#submit_button");
const countEl = document.querySelector("#count");
const questionTitle = document.querySelector("#question_title");
const questionText = document.querySelector("#question_text");
const questionForm = document.querySelector("#question_form");
const answerLabelA = document.querySelector("#answer_a_label");
const answerLabelB = document.querySelector("#answer_b_label");
const answerLabelC = document.querySelector("#answer_c_label");
const answerLabelD = document.querySelector("#answer_d_label");
const scoreEl = document.querySelector("#score");
const responseEl = document.querySelector("#response");
const highScoresEl = document.querySelector("#high_scores");
let gameState = false;
let questionNum = 0;
let score = 0;
let userAnswers = [];
let time_left = 100;

// Retrieve existing high scores from localStorage
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];


// Question and answer text provided by Xpert Learning Assitant
const questionSet = {
    questions: {
            0: {
                title: "",
                text: "",
                a: "",
                b: "",
                c: "",
                d: ""
            },

            1: {
                title: "Question 1",
                text:  "What is the correct way to declare a variable in JavaScript?",
                a: "a) let myVar = 10;",
                b: "b) var myVar = 10;",
                c: "c) const myVar = 10;",
                d: "d) JavaScript doesn't believe in variables, it prefers magic spells."
            },

            2: {
                title: "Question 2:",
                text:  "Which of the following is NOT a JavaScript data type?",
                a: "a) String",
                b: "b) Number",
                c: "c) Boolean",
                d: "d) Pizza"
            },

            3: {
                title: "Question 3:",
                text:  "What does the \"===\" operator in JavaScript do?",
                a: "a) Compares two values for equality, without type conversion",
                b: "b) Assigns a value to a variable",
                c: "c) Performs a mathematical operation",
                d: "d) Makes JavaScript sing a happy song"
            },

            4: {
                title: "Question 4:",
                text:  "What does the \"DOM\" stand for in JavaScript?",
                a: "a) Document Object Model",
                b: "b) Dancing Octopus Mascot",
                c: "c) Donuts Over Muffins",
                d: "d) Definitely Outrageous Monkeys"
            },

            5: {                
                title: "Question 5:",
                text:  "What is the purpose of the \"forEach\" method in JavaScript?",
                a: "a) To loop through an array and execute a function on each element",
                b: "b) To summon a friendly dragon",
                c: "c) To calculate the square root of a number",
                d: "d) To make your computer emit a delicious smell"
            }
    },

    answerSet: 
    ["", "a", "d", "a", "a", "a"]
}

// Increments the question number, checks to see if question number is in the set, then 
// displays it if it's there, if not, it ends the game.
function displayQuestion() {
    ++questionNum; // advance to next question number
    // following line is from Xpert
    if (!(questionNum in questionSet.questions)) {  // if the question number isn't in the question set, end the game
        stopTimer();
    }
    else { // otherwise, display the question title/text/answers
        questionTitle.textContent = questionSet.questions[questionNum].title;
        questionText.textContent = questionSet.questions[questionNum].text;
        answerLabelA.textContent = questionSet.questions[questionNum].a;
        answerLabelB.textContent = questionSet.questions[questionNum].b;
        answerLabelC.textContent = questionSet.questions[questionNum].c;
        answerLabelD.textContent = questionSet.questions[questionNum].d;
    }
}

// clears out any text on the questions
function clearQuestion() {
    questionTitle.textContent = '';
    questionText.textContent = '';
    answerLabelA.textContent = '';
    answerLabelB.textContent = '';
    answerLabelC.textContent = '';
    answerLabelD.textContent = '';
}

// puts the time on the screen
function displayTime(current_time) {
    countEl.innerHTML = current_time; 
}

// tells user if response was right/wrong
function displayResponse(response) {
    responseEl.innerHTML = response;
}

// display the high scores saved in local storage
function displayHighScores() {
    highScoresEl.innerHTML = "";  // reset score list
    for (var i = 0; i < highScores.length; ++i) {
        var score = highScores[i];

        var li = document.createElement("li");
        li.textContent = score["name"] + " -- " + score["score"];

        highScoresEl.appendChild(li);
    }
}

// code from ChatGPT
// adds high score
function addHighScore(name, score, time) {
    // Retrieve existing high scores from localStorage
    // let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
    // Add the new high score
    highScores.push({ name, score, time });
  
    // Sort the high scores based on the score in descending order
    highScores.sort((a, b) => b.score - a.score);
  
    // Limit the number of high scores (e.g., keep top 10)
    const maxHighScores = 10;
    highScores = highScores.slice(0, maxHighScores);
  
    // Store the updated high scores back in localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayScore(score) {
    scoreEl.innerHTML = "Your score is: " + score;
}


// Starts the timer and the game
function startTimer() {
    gameState = true;
    questionNum = 0;
    time_left = 100;
    score = 0;
    displayResponse("");
    displayScore("");
    highScoresEl.innerHTML = "";  // reset score list
    startBtn.innerHTML = "Stop Game"; // change button to say Stop Game
    quizEl.style.display = "block";
    intervalId = setInterval(
        function() {
            if (time_left <= 0) {
                stopTimer();
            }
            displayTime(time_left);
            --time_left;
        },
    1000);
    displayQuestion();
}

// Stops the timer after the last question or if Stop Game is pressed
function stopTimer() {
    gameState = false;
    clearInterval(intervalId); 
    displayTime(time_left);
    clearQuestion()
    startBtn.innerHTML = "Start Game";
    displayScore(score)
    quizEl.style.display = "none";
    let userName = prompt("Enter your name");
    addHighScore(userName, score, time_left);
    displayHighScores()
}

// Start button, on click runs startTimner if the game state is false, otherwise it 
// runs stopTimer if game state is true.
startBtn.addEventListener('click', function(event_this) {
    event_this.stopPropagation();
    event_this.preventDefault();
    if (gameState == false) {
        startTimer(); // starts the timer
    }
    else if (gameState == true) {
        stopTimer();
    }
})

// Submit button, it runs displayQuestion and stores user input.
submitBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    let selectedRadioButton = document.querySelector('input[name="answers"]:checked') // get selected radio button
    let selectedValue = selectedRadioButton.value; // assign the value of that radio button to a variable to check and store
    userAnswers.push(selectedValue); // add user's input to the answer array
    if (selectedValue == questionSet.answerSet[questionNum]) {
        displayResponse("Right answer!")
        ++score;
        displayScore(score);
    }
    else {
        displayResponse("Wrong answer! Lose 25 seconds.")
        time_left = time_left - 25;
    }
    displayQuestion();
})