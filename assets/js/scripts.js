const startBtn = document.querySelector("#start_button");
const countEl = document.querySelector("#count");
let gameState = false;


const questionSet = {
    questions: {
        
    }
}

function displayQuestion() {
    
}


function displayCount(current_count) {
    // console.log(current_count);
    countEl.innerHTML = "Time: " + current_count + " seconds"; 
}


function startTimer() {
    gameState = true;
    let count = 0;
    intervalId = setInterval(
        function() {
            displayCount(count);
            ++count;
        },
    1000);
}


function stopTimer() {
    gameState = false;
    clearInterval(intervalId); // got this from Xpert AI
    let count = 0;
    displayCount(count);
}


startBtn.addEventListener('click', function() {
    if (gameState == false) {
        startTimer();
        displayQuestion();
    }
    else if (gameState == true) {
        stopTimer();
    }
})

