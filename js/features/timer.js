let timerDisplay;
let minutesInput;
let startBtn;
let pauseBtn;
let resetBtn;
let timer;
let totalSeconds = 1800;
let isRunning = false;

export function initTime(){
    timerDisplay = document.getElementById("timerDisplay");
    minutesInput = document.getElementById("minutesInput");
    startBtn = document.getElementById("startBtn");
    pauseBtn = document.getElementById("pauseBtn");
    resetBtn = document.getElementById("resetBtn");
    updateDisplay();
    startBtn.addEventListener('click' , startTimer);
    pauseBtn.addEventListener('click',pauseTimer);
    resetBtn.addEventListener('click' , resetTimer);
}

function updateDisplay(){
    const minutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds%60;
    timerDisplay.innerText = `
    ${String(minutes).padStart(2,"0")}:
    ${String(seconds).padStart(2,"0")}
    `;
}

function startTimer(){
    if(isRunning) return;
    isRunning = true;
    if(minutesInput.value){
        totalSeconds = minutesInput.value * 60;
    }
    timer = setInterval(()=>{
        totalSeconds--;
        updateDisplay();
        if(totalSeconds<=0){
            clearInterval(timer);
            isRunning = false;
            alert("Session Completed")
            resetTimer();
        }
    },1000)
}

function pauseTimer(){
    if(isRunning) isRunning =false;
    clearInterval(timer);
}

function resetTimer(){
    if(isRunning) isRunning =false;
    clearInterval(timer);
    totalSeconds =1800;
    updateDisplay();
}