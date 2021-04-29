let roads = [];
let player = new Car(230, 500, 'car_' + c + '.png', 50, 110);
let colorCar = ['car1.png', 'car2.png', 'car3.png', 'car4.png', 'car5.png']
let carAI = [];
let milis = 0;
let second = 0;
function timeplus() {
   if (second< 10 && milis < 10){
       time.innerHTML = '0' + second + ' : 0' + milis;
   }else if (second >= 10 && milis <10){
       time.innerHTML = second + ' : 0' + milis;
   }else if (second < 10 && milis >= 10){
       time.innerHTML = '0' + second + ' : ' + milis;
   }else {
       time.innerHTML = second + ' : ' + milis;
   }
   milis ++;
   if (milis === 60){
       second++;
       milis = 0;
   }
}
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
addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        player.dx = 10;
    }
    if (e.keyCode == 39) {
        player.dx = -10;
    }
})
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

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
function drawAI() {
    for (let i = 0; i < carAI.length; i++) {
        carAI[i].draw();
        carAI[i].move();
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
            point.play()
            carAI.splice(i, 1);
            score.innerText++;
        }
    }return score.innerText
}

function checkClass() {
    for (let i = 0; i < carAI.length; i++) {
        if (checkCrash(player, carAI[i])) {
            vacham.play()
            localStorage.setItem('abc',checkOut());
            alert("Game Over");
            carAI = [];
            window.location.href = 'gameover.html'

        }
    }
}


