const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'assets/flappy_dunk.png';

// Game consts
const flapSpeed = -5;
const flapWidth = 40;
const flapHeight = 30;
const pipeWidth = 75;
const pipeGap = 125;

let boniX = 50;
let boniY = 50;
let boniVelocity = 0;
let boniAcceleration = 0.1;

// Pipe
let pipeX = 400;
let pipeY = canvas.height - 200;

// Score and high score
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;

let scored = false;

// Keys
document.body.onkeydown = function (e) {
    if (e.code == 'Space') {
        boniVelocity = flapSpeed;
    }
};

// Restart button
document.getElementById('restart-button').addEventListener('click', function(){
    hideEndMenu();
    resetGame();
    loop();
});

function increaseScore() {
    if (boniX > pipeX + pipeWidth && boniX < pipeX + pipeWidth + 3.5 && !scored) {
        score++;
        scoreDiv.innerHTML = score;
        scored = true;
    }
}

function colisionCheck() {
    // Colliders 

    // Boni collider
    const boniBox = {
        x: boniX,
        y: boniY,
        width: flapWidth,
        height: flapHeight
    };

    // Pipe collider - top
    const topPipeBox = {
        x: pipeX,
        y: pipeY - pipeGap + flapHeight,
        width: pipeWidth,
        height: pipeY
    };

    // Pipe collider - bottom
    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + pipeGap + flapHeight,
        width: pipeWidth,
        height: canvas.height - pipeY - pipeGap
    };

    // Check collision top 
    if (boniBox.x + boniBox.width > topPipeBox.x &&
        boniBox.x < topPipeBox.x + topPipeBox.width &&
        boniBox.y < topPipeBox.y) {
        return true;
    }

    // Check collision bottom
    if (boniBox.x + boniBox.width > bottomPipeBox.x &&
        boniBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        boniBox.y + boniBox.height > bottomPipeBox.y + bottomPipeBox.height) {
        return true;
    }

    // Check edges
    if (boniY < 0 || boniY + flapHeight > canvas.height) {
        return true;
    }

    return false;
}

function hideEndMenu() {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

function showEndMenu() {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;

    // Update high score
    if (score > highScore) {
        highScore = score;
    }
    document.getElementById('best-score').innerHTML = highScore;
}

function resetGame() {
    // Reset everything
    boniX = 50;
    boniY = 50;
    boniVelocity = 0;
    boniAcceleration = 0.1;

    // Pipe
    pipeX = 400;
    pipeY = canvas.height - 200;

    score = 0;
    scoreDiv.innerHTML = 0;
}

function endGame() {
    showEndMenu();
}

function loop() {
    // Reset the loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw boni
    ctx.drawImage(flappyImg, boniX, boniY);

    // Pipes
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, pipeWidth, pipeY);
    ctx.fillRect(pipeX, pipeY + pipeGap, pipeWidth, canvas.height - pipeY);

    // Increase score
    increaseScore();

    // Collision check - if boni touches pipes, game restart
    if (colisionCheck()) {
        endGame();
        return;
    }

    // Add condition - if score > 50 pipeX = 2.5
    // If score > 125 pipeX = 3.5
    // If score > 250 pipeX = 4.5;
    // If score > 350 pipeX = 5
    if (score > 350) {
        pipeX -= 5;
    } else if (score > 250) {
        pipeX -= 4.5;
    } else if (score > 125) {
        pipeX -= 3.5;
    } else if (score > 50) {
        pipeX -= 2.5;
    } else {
        pipeX -= 2;
    }

    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - pipeGap) + pipeWidth;
        scored = false;
    }

    // Gravity
    boniVelocity += boniAcceleration;
    boniY += boniVelocity;

    requestAnimationFrame(loop);
}

loop();

