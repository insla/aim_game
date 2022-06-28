const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const color = ['red', 'blue', 'green', 'yellow', 'purple'];



let time = 0;
let score = 0;
let interval = 0;
console.log(interval);



startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
        
});

function startGame() {
    goInterval(decreaseTime, 1000);

    setTime(time);
    createRandomCircle();
}

function decreaseTime () {
    if(time === 0) {
        finishGame();
        stopInterval();
    } else {
        let current = -- time;
        if(current < 10) {
            current = `0${current}`;
        }
        setTime(current); 
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    board.innerHTML = `<h1>Счет : <span class="primary">${score}</span></h1>`;
    timeEl.parentNode.innerHTML = 
    `
        <button class="time-btn restart">
            REstart
        </button>
    `;

    const restart = document.querySelector('.time-btn.restart');
    restart.addEventListener('click', () => {
        window.location.reload();
    });

    

}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 50);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`; 
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.background = color;


    board.append(circle);

}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return color[Math.floor(Math.random() * color.length)];
}

function goInterval(func, time) {
    interval = setInterval(func, time);
    console.log(interval);
}

function stopInterval() {
    clearInterval(interval);
}

