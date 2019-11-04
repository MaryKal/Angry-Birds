// =========================================Задание 3======================================


const animals = document.getElementsByTagName('img');
const animalsLocation = document.querySelector('.animalsLocation')
console.log(animals)
const total = document.querySelector('.total');
let counter = 0;
const timer = document.querySelector('.timer');
const startGame = document.querySelector('.startGame');
let blackBird, redBird, blueBird, pig, timeInt;
const startWindow = document.querySelector('.startWindow');
const gameArea = document.querySelector('.gameArea');
const win = document.querySelector('.endGameWin');
const lose = document.querySelector('.endGameLose');
const winPoints = 100;

console.log(animalsLocation)

Math.rand = function(min, max) { 
    return this.round(this.random() * (max - min) + min);
}

function  Animals(x,y,time,imgPath,animalsLocation,points){
    this.x = x;
    this.y = y;
    this.time = time;
    let interval;
    this.imgPath = imgPath;
    this.img = document.createElement('img');
    this.animalsLocation = animalsLocation;
    this.points = points;

    
    
    this.show = function() {
        this.img.setAttribute('src', this.imgPath);
        this.img.setAttribute('class','birdClick')
        this.img.setAttribute('data-points',this.points)
        this.img.style = `
            position: absolute; 
			left:${this.x}px;
			top:${this.y}px;
        `;
        this.animalsLocation.append(this.img);
        return this;    
               
    }
    this.move = function() {

        interval = setInterval(() => {
            
            this.y = Math.rand(10,89);
            this.img.style.top = this.y + '%';

            this.x = Math.rand(10,89);
            this.img.style.left = this.x + '%';

        }, this.time);
        return this;
    }
    this.stop = function() {
        clearInterval(interval);
        return this;        //ВОТ ЭТОГО НЕ ХВАТАЛО
    }
}

animalsLocation.addEventListener('click',(e)=>{
    if(e.target.classList.contains('birdClick')){
        /* и тут была лажа с условиями */
        let count=+e.target.getAttribute('data-points');
        if(count<0){
            counter+= count;
            if (counter<0) {
                counter = 0;
            }
            
        }else{
            counter += count;
        }
        total.innerHTML = 'Ваш счет: ' + counter;
    }if (counter >= winPoints) {
        counter = 0;
        blackBird.stop();
        redBird.stop();
        blueBird.stop();
        pig.stop();
        endGameWin()
        clearInterval(timeInt);
    }
    
}) 

function gameStart(sec) {
  
     blackBird = new Animals(100, 100, 2000,"images/bird_10_points.png",animalsLocation,10).show().move();
     redBird = new Animals(300, 100, 2300,"images/bird_20_points.png",animalsLocation,20).show().move();
     blueBird = new Animals(300, 200, 1000,"images/bird_50_points.png",animalsLocation,50).show().move();
     pig = new Animals(500, 200, 4000,"images/pig_minus_100_points.png",animalsLocation,'-100').show().move();
    
    let indicator1 = 100 / sec;
    indicator = 100;
    timeInt = setInterval(() => {

        if (sec < 0 && counter < winPoints) {
            //console.log(blackBird)
            blackBird.stop();
            redBird.stop();
            blueBird.stop();
            pig.stop();
            endGameLose()
            clearInterval(timeInt);
            
        } else {
            indicator -= indicator1;
            let curentDisplayMin = Math.floor(sec / 60) < 10 ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60);
            let curentDisplaySec = (sec % 60) == 0 ? '00' : Math.floor(sec % 60) < 10 ? '0' + Math.floor(sec % 60) : Math.floor(sec % 60);

            timer.innerHTML = 'Время: ' + curentDisplayMin + ':' + curentDisplaySec;
        }
        sec -= 1;
    }, 1000);

}

startGame.addEventListener('click', () => {
    
    startGame.style.display = 'none';
    startWindow.style.display = 'none';
    gameArea.classList.remove('gameArea');

    gameStart(15);

});
function endGameLose() {
    
    animalsLocation.style.top = '200vh';
    lose.style.top = '0vh';
    
    clearInterval(timeInt);
}

function endGameWin() {
    
    animalsLocation.style.top = '200vh';
    win.style.top = '0vh';
    
    clearInterval(timeInt);
   
    clearInterval(timeInt);
}


// let blackBird = new Animals(500, 100, 7000,"images/bird_10_points.png",animalsLocation,10).show().move();
// let redBird = new Animals(200, 100, 5000,"images/bird_20_points.png",animalsLocation,20).show().move();
// let blueBird = new Animals(400, 200, 3000,"images/bird_50_points.png",animalsLocation,50).show().move();
// let pig = new Animals(5000, 1000, 5000,"images/pig_minus_100_points.png",animalsLocation,-100).show().move();
