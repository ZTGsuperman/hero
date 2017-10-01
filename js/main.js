// JavaScript source code


window.onload = function () {
    var stick = document.getElementById('stick');
    var wrap = document.getElementById('wrap');
    var hero = document.getElementById('hero');
    var gameBox = document.getElementById("gameBox");
    var rightBox = document.getElementById('rightBox');
    var midelBox = document.getElementById('midelBox');
    var leftBox = document.getElementById('leftBox');
    var score = document.getElementById('score');

    var num = 0;
    var timer = null;
    var off = true;
    var step = 0;
    var midelLeft = 0;
    var next = null;
    var isPlaying = false;
    var totalScore = 0;

    wrap.addEventListener('touchstart', function () {
     
            if (isPlaying) {
                return;
            }
            timer = setInterval(function () {
                num += 5;
                stick.style.width = num + 'px';
                stick.style.left = hero.offsetLeft + hero.offsetWidth + 'px';
            }, 20)
       
    })
   

    wrap.addEventListener('touchend', function () {
            if (isPlaying) {
                return;
            }
            clearInterval(timer);
            midelLeft = midelBox.offsetLeft;
            isPlaying = true;
            stick.style.transition = "0.5s";
            stick.style.WebkitTransform = "rotate(0deg)";
            if (num < (midelBox.offsetLeft - hero.offsetWidth - hero.offsetLeft) || num > (midelBox.offsetLeft + midelBox.offsetWidth - hero.offsetLeft - hero.offsetWidth)) {
                off = false;
            }
            next = creatWl();
            rightBox.style.width = next[0] + 'px';
            rightBox.style.left = next[1] + 'px';
       
    })
   
    stick.addEventListener("transitionend", function () {
        isPlaying = true;
        hero.style.transition = '1s';
        hero.style.left = stick.offsetLeft + num - 20 + 'px';
    })
    var heroL
    hero.addEventListener("transitionend", function (ev) {
        var ev = ev || event;
        if (!off) {
            hero.style.bottom = 0 + 'px';
            iScore();
            return;
        }
        totalScore++;
        heroL = hero.offsetLeft - midelBox.offsetLeft;
        isPlaying = true;
        gameBox.style.left = -midelBox.offsetLeft + 'px';
        gameBox.style.transition = '1s';
        step = 1;
        ev.stopPropagation();
    })

    gameBox.addEventListener("transitionend", function () {
        if (step == 1) {
            gameBox.style.left = 0;
            gameBox.style.transition = "none";
            stick.style.width = 0;
            stick.style.transition = "none";
            stick.style.WebkitTransform = "rotate(-90deg)";
            hero.style.transition = "none";
            hero.style.left = heroL + 'px';
            leftBox.style.width = midelBox.offsetWidth + 'px';
            midelBox.style.width = next[0] + 'px';
            midelBox.style.left = next[1] - midelLeft + 'px';

            var dis = hero.offsetWidth + hero.offsetLeft-leftBox.offsetWidth;
            if (dis > 0) {
                hero.style.left = heroL+dis-15 + 'px';
            }
            if (hero.offsetLeft < 0) {
                var dis2 = 0 - hero.offsetLeft;
                hero.style.left = heroL+dis2+ 'px';
            }

            step = 0;
            num = 0;
            isPlaying = false;
        }

    })


    function iScore() {
        var str = "<span>游戏失败！</br></span><span>总成绩为：" + totalScore + "</span>"
        str += " <input id=btn type=button  value=再来一次 />"
        score.innerHTML = str;
        var oBtn = document.getElementById('btn');
        score.style.display = "block";
        oBtn.addEventListener('touchstart', function () {
            window.location.reload();
        })
       
    }
    //随机数
    function creatNum(star, end) {
        return parseInt(Math.random() * (end - star) + star);
    }
    function creatWl() {
        var iWidth = creatNum(25, 80);
        var iLeft = creatNum(400, 250 + midelLeft);
        return [iWidth, iLeft];
    }
}