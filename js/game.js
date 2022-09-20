import '../css/style.css';

import bird_png from "../img/bird.png";
import bg_png from "../img/bg.png";
import fg_png from "../img/fg.png";
import pipeUp_png from "../img/pipeUp.png";
import pipeBottom_png from "../img/pipeBottom.png";

import fly_mp3 from "../audio/fly.mp3";
import score_audio_mp3 from "../audio/score.mp3";

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

const fly = new Audio();
const score_audio = new Audio();

bird.src = bird_png;
bg.src = bg_png;
fg.src = fg_png;
pipeUp.src = pipeUp_png;
pipeBottom.src = pipeBottom_png;

fly.src = fly_mp3;
score_audio.src = score_audio_mp3;

const body = document.getElementById("body");
const canvas = document.getElementById("canvas");
const play_btn = document.getElementById("play-btn");

body.onload = function hist() {
    const points = document.getElementById("point");
    if (history.state) {
        console.log(history.state);
        points.innerText = history.state;
    } else {
        points.innerText = "0";
    }
}

play_btn.addEventListener("click", play);

function play() {

    if (window.innerWidth < window.innerHeight) {
        body.classList.add("align-items");
        canvas.classList.add("vw-max");
        canvas.classList.add("fit-content");
    }

    document.getElementById('display').classList.add("dnone");
    canvas.classList.remove("dnone");

    draw();

    document.addEventListener("keydown", (e) => {
        if (e.code == "Space") {
            moveUp();
        }
    });

    function moveUp() {
        yPos -= 25;
        fly.play();
    }
}

const cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var gap = 90;

var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;

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