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