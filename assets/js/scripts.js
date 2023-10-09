const startBtn = document.querySelector("#start_button");
const countEl = document.querySelector("#count");
let gameState = false;


function displayCount(current_count) {
    console.log(current_count);
    countEl.innerHTML = "Time: " + current_count + " seconds"; 
}


function startTimer() {
    let count = 0.000;
    setInterval(
        function() {
            displayCount(count);
            ++count;
        },
    1000);
}


startBtn.addEventListener('click', function() {
    if (gameState == false) {
        gameState = true;
        startTimer();
    }
})

