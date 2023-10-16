const startBtn = document.querySelector("#start_button");
const submitBtn = document.querySelector("#submit_button");
const countEl = document.querySelector("#count");
const questionTitle = document.querySelector("#question_title");
const questionText = document.querySelector("#question_text");
const questionForm = document.querySelector("#question_form");
const answerLabelA = document.querySelector("#answer_a_label");
const answerLabelB = document.querySelector("#answer_b_label");
const answerLabelC = document.querySelector("#answer_c_label");
const answerLabelD = document.querySelector("#answer_d_label");
let gameState = false;
let questionNum = 0;
let score = 0;
let userAnswers = [];


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
    ["a", "d", "a", "a", "a"]
}


function displayQuestion() {
    ++questionNum;
    // following line is from Xpert
    if (!(questionNum in questionSet.questions)) {
        console.log("End of questions");
        stopTimer();
    }
    else {
        questionTitle.textContent = questionSet.questions[questionNum].title;
        questionText.textContent = questionSet.questions[questionNum].text;
        answerLabelA.textContent = questionSet.questions[questionNum].a;
        answerLabelB.textContent = questionSet.questions[questionNum].b;
        answerLabelC.textContent = questionSet.questions[questionNum].c;
        answerLabelD.textContent = questionSet.questions[questionNum].d;
    }
}

function clearQuestion() {
    questionTitle.textContent = '';
    questionText.textContent = '';
    answerLabelA.textContent = '';
    answerLabelB.textContent = '';
    answerLabelC.textContent = '';
    answerLabelD.textContent = '';
}


function displayTime(current_time) {
    countEl.innerHTML = current_time; 
}


function startTimer() {
    gameState = true;
    questionNum = 0;
    let time_left = 100;
    startBtn.innerHTML = "Stop Game"; // change button to say Stop Game
    intervalId = setInterval(
        function() {
            displayTime(time_left);
            --time_left;
        },
    1000);
    displayQuestion();
}


function stopTimer() {
    gameState = false;
    clearInterval(intervalId); 
    let count = 0;
    displayTime(count);
    clearQuestion()
    startBtn.innerHTML = "Start Game";
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
    let selectedRadioButton = document.querySelector('input[name="answers"]:checked')
    let selectedValue = selectedRadioButton.value;
    userAnswers.push(selectedValue);
    displayQuestion();
})