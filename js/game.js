// Запуск игры
document.getElementById('play-btn').addEventListener("click", play);

function play() {

    if (window.innerWidth < window.innerHeight) {
        document.getElementById("body").classList.add("align-items");
        document.getElementById('canvas').classList.add("vw-max");
        document.getElementById("canvas").classList.add("fit-content");
    }

    document.getElementById('display').classList.add("dnone");
    document.getElementById('canvas').classList.remove("dnone");


    // function moveUp(e) {
    //     if (e.code == "Space") {
    //         yPos -= 25;
    //         fly.play();
    //     }
    // }
    draw();

    // При нажатии на кнопку Пробел
    document.addEventListener("keydown", (e) => {
        if (e.code == "Space") {
            moveUp();
        }
    });

    let a = true;
    let id;

    document.addEventListener("touchend", () => {
        a = false;
        setTimeout(() => {
            clearInterval(id);
            
            a = true;
        }, 300);
    })

    document.addEventListener("touchstart", () => {
        moveUp();
        setTimeout(() => {
            if (a) {
                Upupup();
            }
        }, 300);
    });
    
    function Upupup() {
        id = setInterval(moveUp, 100);
    }

    function moveUp() {
        yPos -= 25;
        fly.play();
    }
}



var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bg, 250, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 280) {
            pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(fg, 250, cvs.height - fg.height);

        // Отслеживание столкновений
        if(xPos + bird.width >= pipe[i].x
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
        || yPos + bird.height >= cvs.height - fg.height) {
            if (history.state) {
                console.log(history.state);
                if (history.state < score) {
                    history.pushState(score, "", "./index.html");
                }
            } else {
                history.pushState(score, "", "./index.html");
            }
            return location.reload();
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}