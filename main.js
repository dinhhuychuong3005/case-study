player.draw(canvas)
creatRoad();
setInterval(timeplus, 100);
createAI();
function main() {

    drawWay();
    drawAI();
    tangToc()
    checkClass();
    checkOut();

    player.draw(canvas)
    player.move2();
    requestAnimationFrame(main);
}
main();
