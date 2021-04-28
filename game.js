const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let roads = [];
let player = new Car(230, 500, 'car_' + c + '.png', 50, 110);
let colorCar = ['car1.png', 'car2.png', 'car3.png', 'car4.png', 'car5.png']
let score = document.querySelector('.score > span')
let carAI = [];
let time = document.querySelector('.time >span ')
let milis = 0;
let second = 0;

function timeplus() {
    milis++;
    if (milis === 60) {
        second++
        time.innerHTML = second;
        milis = 0;
    }
}

setInterval(timeplus, 1);

function Car(x, y, link, width, height) {
    this.x = x
    this.y = y;
    this.width = width;
    this.height = height;
    this.link = link;
    this.speed = 10;
    this.dx = 0;
    this.draw = function () {
        let img = new Image();
        img.src = this.link
        ctx.drawImage(img, this.x, this.y, 50, 110);
    }
    this.move = function () {
        this.y += this.speed;
    }
    this.move2 = function () {
        if (this.x - this.dx > 140 && this.x - this.dx < 320) {
            this.x -= this.dx
            if (this.x == 140 || this.x == 230 || this.x == 320) {
                this.dx = 0
            }
        }
    }
}

class Road {
    constructor(img, x, y) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    draw(canvas) {
        //let ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height / 2);
    }

    move() {
        this.y += 5;
    }

    setPosition(y) {
        this.y = y;
    }
}

addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        player.dx = 10;
    }
    if (e.keyCode == 39) {
        player.dx = -10;
    }
})

function createAI() {
    let pos = [150, 230, 310];
    let rand = Math.floor(Math.random() * pos.length);
    let randCar = Math.floor(Math.random() * colorCar.length);
    let randTime = randomNumber(1000, 3000);
    // for (let i = 0; i < 3; i++) {
    let car = new Car(pos[rand], -500, colorCar[randCar], 50, 110);
    carAI.push(car);
    // }
    setTimeout(createAI, randTime)
}

createAI();


function drawAI() {
    for (let i = 0; i < carAI.length; i++) {
        carAI[i].draw();
        carAI[i].move();
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function creatRoad() {

    let img = new Image();
    img.src = 'road.png'
    let road1 = new Road(img, 0, -(canvas.height / 2));
    let road2 = new Road(img, 0, 0);
    let road3 = new Road(img, 0, canvas.height / 2);
    let road4 = new Road(img, 0, canvas.height);
    roads = [road1, road2, road3, road4]
}

function drawWay() {
    let img = new Image();
    img.src = 'road.png'
    for (let i = 0; i < roads.length; i++) {
        roads[i].move();
        roads[i].draw(canvas);
        if (roads[i].y > canvas.height) {
            roads[i].setPosition(-(canvas.height / 2));
        }
    }
}

function checkCrash(obj1, obj2) {
    let lef1 = obj1.x;
    let right1 = obj1.x + obj1.width;
    let top1 = obj1.y;
    let bottom1 = obj1.y + obj1.height;
    let lef2 = obj2.x;
    let right2 = obj2.x + obj2.width;
    let top2 = obj2.y;
    let bottom2 = obj2.y + obj2.height;
    if (lef1 > right2 || right1 < lef2 || top1 > bottom2 || bottom1 < top2) {
        return false;
    } else {
        return true;
    }
}


function checkOut() {
    for (let i = 0; i < carAI.length; i++) {
        if (carAI[i].y > 500) {
            carAI.splice(i, 1);
            score.innerText++;
        }
    }
}


player.draw(canvas)
creatRoad();

function main() {
    //clearAll();
    drawWay();
    drawAI();
    checkClass();
    checkOut();

    player.draw(canvas)
    player.move2();
    requestAnimationFrame(main);
}

function speed() {
    this.speed += 5
}

setInterval(speed, 3000)

function checkClass() {
    for (let i = 0; i < carAI.length; i++) {
        if (checkCrash(player, carAI[i])) {
            alert("Game Over");
        }
    }
}
//window.location.href = 'gameover.html'

main();