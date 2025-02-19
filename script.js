// State variables
let steps = 0;
let goalSteps = 10000;
let history = [];
let achievements = [
    { name: "First Steps", steps: 1000, earned: false },
    { name: "Walking Warrior", steps: 5000, earned: false },
    { name: "Step Master", steps: 10000, earned: false }
];

// Core functions
function addSteps(count) {
    const previousSteps = steps;
    steps += count;
    updateDisplay();
    checkAchievements(previousSteps);
    addToHistory(`Added ${count} steps`);
}

function addCustomSteps() {
    const customInput = document.getElementById('customSteps');
    const count = parseInt(customInput.value);
    if (count > 0) {
        addSteps(count);
        customInput.value = '';
    }
}

function resetSteps() {
    steps = 0;
    updateDisplay();
    addToHistory('Reset steps counter');
}

function setCustomGoal() {
    const newGoal = prompt('Enter new goal (steps):', goalSteps);
    if (newGoal && !isNaN(newGoal) && newGoal > 0) {
        goalSteps = parseInt(newGoal);
        document.getElementById('goalSteps').textContent = goalSteps.toLocaleString();
        updateDisplay();
        addToHistory(`Set new goal: ${goalSteps} steps`);
    }
}

// Utility functions
function calculateCalories() {
    // Rough estimation: 1 step ≈ 0.04 calories
    return Math.round(steps * 0.04);
}

function checkAchievements(previousSteps) {
    achievements.forEach(achievement => {
        if (!achievement.earned && steps >= achievement.steps && previousSteps < achievement.steps) {
            achievement.earned = true;
            showMilestoneAlert(`Achievement Unlocked: ${achievement.name}!`);
        }
    });
    updateAchievements();
}

function showMilestoneAlert(message) {
    const alert = document.getElementById('milestoneAlert');
    alert.textContent = message;
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

// History management
function addToHistory(action) {
    const time = new Date().toLocaleTimeString();
    history.unshift({ time, action });
    if (history.length > 5) history.pop();
    updateHistory();
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '<h3>History</h3>';
    history.forEach(entry => {
        historyDiv.innerHTML += `<div>${entry.time}: ${entry.action}</div>`;
    });
}

// UI updates
function updateAchievements() {
    const achievementsDiv = document.getElementById('achievements');
    achievementsDiv.innerHTML = '<h3>Achievements</h3>';
    achievements.forEach(achievement => {
        const icon = achievement.earned ? '🏆' : '🔒';
        achievementsDiv.innerHTML += `
            <div class="achievement">
                <span class="achievement-icon">${icon}</span>
                <span>${achievement.name} (${achievement.steps} steps)</span>
            </div>
        `;
    });
}

function updateDisplay() {
    // Update step count
    document.getElementById('stepCount').textContent = steps.toLocaleString();
    
    // Update progress bar
    const progress = (steps / goalSteps) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = Math.min(progress, 100) + '%';

    // Update calories
    document.getElementById('calories').textContent = calculateCalories();

    // Update average (assuming it's daily)
    document.getElementById('avgSteps').textContent = Math.round(steps).toLocaleString();

    // Update background based on progress
    if (steps >= goalSteps) {
        document.body.style.background = 'linear-gradient(135deg, var(--success-color), #16a34a)';
    } else if (steps >= goalSteps * 0.7) {
        document.body.style.background = 'linear-gradient(135deg, var(--warning-color), #d97706)';
    } else {
        document.body.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }
}

// Initialization
function init() {
    document.getElementById('goalSteps').textContent = goalSteps.toLocaleString();
    updateDisplay();
    updateAchievements();
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === ' ') {
        addSteps(100);
    } else if (event.key === 'ArrowRight') {
        addSteps(500);
    } else if (event.key === 'r' || event.key === 'R') {
        resetSteps();
    }
});

// Initialize the app
init();