let num = 1
function check(){
    if (num >= 3){
        num = 1;
    }else {
        num ++;
    }
    document.getElementById('img').src = 'car_' + num + '.png'
}

function save(){

    localStorage.setItem('num',num)
    window.location.href = 'game.html'
}
let c = localStorage.getItem('num')
