const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const status = document.getElementById('status');
const goalInput = document.getElementById('goalInput');
const progressBar = document.getElementById('progressBar');

const totalTime = 25 * 60; // 25 minutes in seconds
let timeLeft = totalTime;
let intervalId = null;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update progress bar (fills as time passes)
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    status.textContent = 'Focus time!';
    goalInput.disabled = true;
    
    intervalId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(intervalId);
            isRunning = false;
            status.textContent = 'Time\'s up! Take a break.';
            // Play a sound or notification could go here
            alert('Pomodoro complete! Time for a break.');
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(intervalId);
    isRunning = false;
    status.textContent = 'Paused';
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    timeLeft = totalTime;
    updateDisplay();
    status.textContent = 'Ready to focus';
    goalInput.disabled = false;
    progressBar.style.width = '0%';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();

