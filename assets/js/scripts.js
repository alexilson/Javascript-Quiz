const startBtn = document.querySelector("#start_button");
const countEl = document.querySelector("#count");
const questionTitle = document.querySelector("#question_title");
// const questionText = document.querySelector("#question_text");
// const questionForm = document.querySelector("#question_form");
let gameState = false;


// Question and answer text provided by Xpert Learning Assitant
const questionSet = {
    questions: {
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
                text:  "What does the "===" operator in JavaScript do?",
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
//     for (let i = 1; i = Object.keys(questionSet.questions).length; ++i) {
//     questionTitle.textContent = "Hello"; //questionSet.questions.i.title.value;
// }
}


function displayCount(current_count) {
    countEl.innerHTML = current_count; 
}


function startTimer() {
    let count = 1;
    intervalId = setInterval(
        function() {
            displayCount(count);
            ++count;
        },
    1000);
}


function stopTimer() {
    gameState = false;
    clearInterval(intervalId); 
    let count = 0;
    displayCount(count);
}


startBtn.addEventListener('click', function() {
    if (gameState == false) {
        gameState = true;
        startTimer(); // starts the timer
        startBtn.innerHTML = "Stop Game"; // change button to say Stop Game
        displayQuestion();
    }
    else if (gameState == true) {
        stopTimer();
    }
})

// I could move all this to a function called startGame where it changes the gamestate, starts the timer, and
// changes the button text to read Stop Timer.