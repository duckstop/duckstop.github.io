/**
 * Created by Christoffer May Kierpaul og Teis Andersson on 07-01-2015.
 */
var stage, canvas;
var ship;
var leftKeyDown=rightKeyDown=false;
var upKeyDown=downKeyDown= false;
var spaceKeyDown = false;
var pellet, enemyPellet;
var redshotss, shipss, blueshotss, explosionss;
var explosion = new createjs.Sprite();
var explosions = new createjs.Container();
var pellets = new createjs.Container();
var enemyPellets = new createjs.Container();
var enemies = new createjs.Container();
var timer = 0;
var collisionDetector = ndgmr.checkRectCollision;
var astaroid;
var astaroids = new createjs.Container();
var astaroid2;
var astaroids2 = new createjs.Container();
var astaroid3;
var astaroids3 = new createjs.Container();
var astaroid4;
var astaroids4 = new createjs.Container();
var timerA = 0;
var timerA1 = 0;
var timerA2 = 0;
var timerA3 = 0;
var timerE = 0;
var timerPUP = 0;
var enemyPelletTimer = 0;
var powerUps = new createjs.Container();
var point = 0;
var text;
var powerUp = false;
var gameRunning = false;
var shipDead = false;
var enemiesOnLevel = 10;
var enemySpawning = 1;
var textLevel;
var enemySpeed  = 4;
var ammoPU = 0;
var ammoCount;

Game.Main = {


    start: function(){

        game();

    }

};


function game()
{
    stage = new createjs.Stage("game");
    canvas = document.getElementById("game");
    imagePath = "./img/";
    soundPath = "./sound/";
    drawStartScreen();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", onTick);

}

function drawStartScreen(point){


    var startScreen =  new createjs.Shape();
    startScreen.graphics.beginFill("#000000").drawRect(0,0,800,800);


    var startText = new createjs.Text("Start Game", "60px Arial", "#FF0000");
    startText.x = 250;
    startText.y = 370;
    startText.addEventListener("click", handleClick);

    if(point == null){point = 0;}

    text = new createjs.Text("Points: " + point, "20px Arial", "#ff7700");
    text.x = 100;
    text.y = 100;
    text.textBaseline = "alphabetic";

    stage.addChild(startScreen, startText, text);

    console.log("Startscrren load!");

}
function handleClick(e){

    point = 0;
    pellets.removeAllChildren();
    enemyPellets.removeAllChildren();
    enemies.removeAllChildren();
    powerUps.removeAllChildren();
    astaroids.removeAllChildren();
    astaroids2.removeAllChildren();
    astaroids3.removeAllChildren();
    astaroids4.removeAllChildren();
    stage.removeAllChildren();
    enemySpeed = 2;
    shipDead = false;
    gameRunning = false;
    console.log(stage);
    powerUp = false;
    timerE = 0;
    enemySpawning = 1;
    ammoPU = 0;
    enemiesOnLevel = 10;

    stage.removeAllChildren();

    setUpGame();

}
function setUpGame(){

    gameRunning = true;

    window.onkeydown=keyDown;
    window.onkeyup=keyUp;

    addBg();

    drawAstaroid2();
    drawAstaroid2();
    drawAstaroid2();
    astaroids2.children[0].x = Math.floor((Math.random()*720) + 1);
    astaroids2.children[0].y = Math.floor((Math.random()*720) + 1);
    astaroids2.children[1].x = Math.floor((Math.random()*720) + 1);
    astaroids2.children[1].y = Math.floor((Math.random()*720) + 1);
    astaroids2.children[2].x = Math.floor((Math.random()*720) + 1);
    astaroids2.children[2].y = Math.floor((Math.random()*720) + 1);

    drawAstaroid3();
    drawAstaroid3();
    drawAstaroid3();
    astaroids3.children[0].x = Math.floor((Math.random()*720) + 1);
    astaroids3.children[0].y = Math.floor((Math.random()*720) + 1);
    astaroids3.children[1].x = Math.floor((Math.random()*720) + 1);
    astaroids3.children[1].y = Math.floor((Math.random()*720) + 1);
    astaroids3.children[2].x = Math.floor((Math.random()*720) + 1);
    astaroids3.children[2].y = Math.floor((Math.random()*720) + 1);

    stage.addChild(astaroids2,astaroids3,astaroids4, astaroids, pellets, enemyPellets, enemies, powerUps, explosions);
    setUpSpriteSheets();

    console.log("GAME SETUP DONE");
}

function setUpSpriteSheets() {


    var shipData = {
        "framerate": 20,
        "images": [imagePath + "spaceship.png"],

        "frames": [

            [2, 2, 39, 36],
            [43, 2, 29, 35],
            [74, 2, 30, 36]
        ],

        "animations": {

            "idle": 0,
            "left": 2,
            "right": 1
        }
    };

    exploImg = new Image();
    exploImg.src = "./img/explosion.png";

    var exploData = {

        "framerate": 10,
        "images": [exploImg],

        "frames": [

            // "filename": "explosion1.png",
            [1, 1, 78,61],

            //"filename": "explosion10.png",
            [80, 1, 166, 103],

            //"filename": "explosion11.png",
            [247, 1, 156, 91],

            //"filename": "explosion12.png",
            [404, 1, 127, 62],

            //"filename": "explosion2.png",
            [532, 1, 104, 73],

            //"filename": "explosion3.png",
            [637,  1, 135, 84],

            //"filename": "explosion4.png",
            [773, 1, 151, 91],

            //"filename": "explosion5.png",
            [925, 1, 166, 96],

            //"filename": "explosion6.png",
            [1092, 1, 179, 105],

            //"filename": "explosion7.png",
            [1272, 1, 177, 110],

            //"filename": "explosion8.png",
            [1450,  1, 177, 108],

            //"filename": "explosion9.png",
            [1628, 1, 172, 104]
        ],

        "animations": {

            "boom": [0,4,5,6,7,8,9,10,11,1,2,3]

        }
    };

    pelletImg = new Image();
    pelletImg.src = "./img/blueshot.png";

    var blueshotData = {

        "framerate": 15,
        "images": [pelletImg],

        "frames": [

            //blueshot1
            [2, 2, 10, 18],
            //blueshot2
            [14, 2, 8, 19]

        ],

        "animations": {

            "blueshot": [0, 1]

        }
    };

    var redshotData = {

        "framerate": 15,
        "images": [imagePath + "redshot.png"],

        "frames": [

            [2, 2, 8, 18],

            [12, 2, 11, 19]

        ],

        "animations": {

            "redshot": [0, 1]
        }
    };


    shipss = new createjs.SpriteSheet(shipData);
    blueshotss = new createjs.SpriteSheet(blueshotData);
    redshotss = new createjs.SpriteSheet(redshotData);
    explosionss = new createjs.SpriteSheet(exploData);

    console.log("SHEET SETUP DONE!");

    setUPActors();

    console.log("SPRITESHEET DONE");

}

function guiDisplay (){

    stage.removeChild(text);
    text = new createjs.Text("Points: " + point, "20px Arial", "#ff7700");
    text.x = 50;
    text.y = 50;

    stage.addChild(text);

    stage.removeChild(ammoCount);
    ammoCount = new createjs.Text("Ammo: " + ammoPU, "20px Arial", "#ff7700");
    ammoCount.x = 50;
    ammoCount.y = 80;

    stage.addChild(ammoCount);

}

function setUPActors(){


    ship = new createjs.Sprite(shipss);

    ship.x = 400;
    ship.y = 700;

    ship.nextX = ship.x;
    ship.nextY = ship.y;
    ship.speed = 5;
    ship.width = 47;
    ship.height = 43;
    ship.scaleX = ship.scaleY = 2.0;

    stage.addChild(ship);
    console.log(ship.getStage());
    console.log("ACTORS DONE!");

}

function addBg(){
    background = new createjs.Bitmap(imagePath + "bg.jpg");
    background.x = 0;
    background.y = 0;
    stage.addChild(background);

    console.log("BG DONE!");
}

function keyDown(e){
    switch(e.keyCode){
        case 39:
            rightKeyDown = true;
            break;
        case 37:
            leftKeyDown = true;
            break;
        case 38:
            upKeyDown = true;
            break;
        case 40:
            downKeyDown = true;
            break;
        case 32:
            spaceKeyDown = true;
            break;
    }
}
function keyUp(e){
    switch(e.keyCode){
        case 39:
            rightKeyDown = false;
            break;
        case 37:
            leftKeyDown = false;
            break;
        case 38:
            upKeyDown = false;
            break;
        case 40:
            downKeyDown = false;
            break;
        case 32:
            spaceKeyDown = false;
            break;
    }
}

function shipPosition() {


    if(!leftKeyDown && !rightKeyDown && !upKeyDown && !downKeyDown){

        ship.gotoAndPlay("idle")
    }

    else if (leftKeyDown) {

        ship.gotoAndPlay("left");
        if(ship.x < 15){ship.x = 15;}
        ship.nextX = ship.x - ship.speed;


    } else if (rightKeyDown) {

        ship.gotoAndPlay("right");
        if (ship.x > canvas.width - 80){ship.x = 720}
        ship.nextX = ship.x + ship.speed;

    }
    else if(upKeyDown){

        if(ship.y < 10){ship.y = 10}

        ship.nextY = ship.y - ship.speed;

    }
    else if(downKeyDown){

        if(ship.y > canvas.height - 80){ship.y = 720}

        ship.nextY = ship.y + ship.speed;


    }

}
function shoot(){

    if(spaceKeyDown){
           if(ammoPU > 0){
               if (timer >= 5) {

                   drawPellet();
                   ammoPU--;

                   timer = 0;
               }
           }
            else {

               if (timer >= 15) {

                   drawPellet();

                   timer = 0;
               }
           }
    }
}
function enemyShoot(){
    if(enemyPelletTimer > 100) {

        for(var i = 0; i < enemies.children.length; i++)
        {

                enemyPellet = new createjs.Sprite(redshotss);

                enemyPellet.x = enemies.children[i].x + 28;
                enemyPellet.y = enemies.children[i].y + 21;
                enemyPellet.scaleX = enemyPellet.scaleY = 1.5;

                enemyPellets.addChild(enemyPellet);
                stage.update();

                enemyPelletTimer = 0;

                enemyPellet.gotoAndPlay("redshot");
                var pew = createjs.Sound.play("pew");
                pew.volume = 0.5;

        }
    }
}
function moveShip(){

    ship.x = ship.nextX;
    ship.y = ship.nextY;

}

function moveAstaroid(){

    for (var m = 0; m < astaroids.children.length; m++){

        astaroids.children[m].y +=1.2;

        if(astaroids.children[m].y > 860) {

            astaroids.removeChildAt(m);
            timerA = 0;
        }
    }

}

function moveAstaroid2(){

    for (var n = 0; n < astaroids2.children.length; n++){

        astaroids2.children[n].y +=0.4;

        if(astaroids2.children[n].y > 860) {

            astaroids2.removeChildAt(n);

        }

    }
}

function moveAstaroid3(){

    for (var c = 0; c < astaroids3.children.length; c++){

        astaroids3.children[c].y +=0.8;
        if(astaroids3.children[c].y > 860) {

            astaroids3.removeChildAt(c);

        }

    }
}

function moveAstaroid4(){

    for (var c = 0; c < astaroids4.children.length; c++){

        astaroids4.children[c].y +=0.5;
        if(astaroids4.children[c].y > 860) {

            astaroids4.removeChildAt(c);
        }
    }
}

function asteroidChecker(){

    if(timerPUP > 420){

        timerPUP = 0;
        drawPowerUp();
    }

    if(timerA >= 200 && astaroids.children.length <= 4){

        timerA = 0;
        drawAstaroid();
    }

    if(timerA1 >= 360 && astaroids2.children.length <= 3){

        timerA1 = 0;
        drawAstaroid2();
    }

    if(timerA2 >= 270 && astaroids3.children.length <= 4){

        timerA2 = 0;
        drawAstaroid3();
    }

    if(timerA3 >= 270 && astaroids4.children.length <= 4){

        timerA3 = 0;
        drawAstaroid4();
    }
}

function movePellet(){

    for ( var j = 0; j < pellets.children.length; j++){

        pellets.children[j].y -= 10;

        if(pellets.children[j].y < 0) {

            pellets.removeChildAt(j);
            console.log("Pellet Removed!");
        }
    }

    for (var i = 0; i < enemyPellets.children.length; i++){

        enemyPellets.children[i].y += enemySpeed +2;

        if(enemyPellets.children[i].y > 820){

            enemyPellets.removeChildAt(i);
        }
    }
}

function movePowerUp(){

    for ( var j = 0; j < powerUps.children.length; j++){

        powerUps.children[j].y += 5;
        if(powerUps.children[j].y > 820){powerUps.removeChildAt(j);}

    }
}

function drawAstaroid(){

    astaroid = new createjs.Bitmap(imagePath + "asta.png");

    astaroid.x =  Math.floor((Math.random()*750) + 1);
    astaroid.y = -300;
    astaroid.regX = astaroid.regY = 84;

    astaroids.addChild(astaroid);
    stage.update();

}

function drawAstaroid2(){

    astaroid2 = new createjs.Bitmap(imagePath + "asta2.png");


    astaroid2.x =  Math.floor((Math.random()*750) + 1);
    astaroid2.y = -300;
    astaroid2.regX = 31.5;
    astaroid2.regY = 27.25;

    astaroids2.addChild(astaroid2);
    stage.update();

}

function drawAstaroid3(){

    astaroid3 = new createjs.Bitmap(imagePath + "asta3.png");


    astaroid3.x =  Math.floor((Math.random()*750) + 1);
    astaroid3.y = -300;
    astaroid3.regX = 45;
    astaroid3.regY = 45;

    astaroids3.addChild(astaroid3);
    stage.update();


}

function drawAstaroid4(){

    astaroid4 = new createjs.Bitmap(imagePath + "asta4.png");


    astaroid4.x =  Math.floor((Math.random()*750) + 1);
    astaroid4.y = -300;
    astaroid4.regX = 62.5;
    astaroid4.regY = 62.5;

    astaroids4.addChild(astaroid4);
    stage.update();

}

function drawPellet(){

    pellet = new createjs.Sprite(blueshotss);

    pellet.x = ship.x + 28;
    pellet.y = ship.y + 21;
    pellet.scaleX = pellet.scaleY = 1.5;

    pellets.addChild(pellet);
    stage.update();

    pellet.gotoAndPlay("blueshot");
    createjs.Sound.play("pew");

}

function drawPowerUp(){

    pUP = new createjs.Bitmap(imagePath + "pUP.png");

    pUP.x =  Math.floor((Math.random()*750) + 1);
    pUP.y = -100;

    powerUps.addChild(pUP);
    stage.update();

}

function drawEnemies(){

    var enemy = new createjs.Bitmap(imagePath + "enemy.png");


    enemy.y = -20;
    enemy.x = Math.floor((Math.random()*750) + 1);
    enemy.scaleX = enemy.scaleY = 0.5;

    enemies.addChild(enemy);
    stage.update();
}

function enemyMove(){

    for (var i = 0; i < enemies.children.length; i++){

        if(enemies.children[i].x < 15){enemies.children[i].x = 15;}
        if(enemies.children[i].x > canvas.height - 80){enemies.children[i].x = 720;}
        if(enemies.children[i].y > 860){enemies.removeChildAt(i); console.log("Enemy removed!");}


        enemies.children[i].y += enemySpeed;

    }
}

function collisionHandler(){


    explosion.on("animationend", handleAnimationEnd);

    for (var k = 0; k < enemies.children.length; k++){

        if(enemies.children.y > 820) {

            enemies.removeChildAt(k);
        }
        // blueshot collision
        for (var l = 0; l < pellets.children.length; l++){

            var intersection =  collisionDetector(pellets.children[l], enemies.children[k]);

            if (intersection !== null){

                explosion = new createjs.Sprite(explosionss, "boom");
                explosion.x = enemies.children[k].x;
                explosion.y = enemies.children[k].y;


                explosions.addChild(explosion);
                createjs.Sound.play("explo");
                pellets.removeChildAt(l);
                enemies.removeChildAt(k);
                stage.update();

                point = point+1;

            }
        }

        // redshot collision
        for (var l = 0; l < enemyPellets.children.length; l++){

            var intersection =  collisionDetector(enemyPellets.children[l], ship);

            if (intersection !== null){

                explosion = new createjs.Sprite(explosionss, "boom");
                explosion.x = ship.x;
                explosion.y = ship.y;

                stage.removeChild(ship);
                explosions.addChild(explosion);

                createjs.Sound.play("explo");
                stage.update();

                shipDead = true;

            }
        }

        var intersectShip = collisionDetector(ship, enemies.children[k]);

        if (intersectShip !== null){

            shipDead = true;

            explosion = new createjs.Sprite(explosionss, "boom");
            explosion.x = ship.x;
            explosion.y = ship.y;

            explosions.addChild(explosion);

            createjs.Sound.play("explo");
            stage.removeChild(ship);
            stage.update();

        }

    }

    // powerup collision
    for (var s = 0; s < powerUps.children.length; s++ ) {


        var intersectPowerUP = collisionDetector(ship, powerUps.children[s]);

        if (intersectPowerUP !== null){

            powerUps.removeChildAt(s);
            ammoPU = ammoPU + 20;
            createjs.Sound.play("powerup");

        }
    }
}

function handleAnimationEnd (e){

    if(shipDead){

        var point1 = point;

        pellets.removeAllChildren();
        enemies.removeAllChildren();
        powerUps.removeAllChildren();
        astaroids.removeAllChildren();
        astaroids2.removeAllChildren();
        astaroids3.removeAllChildren();
        astaroids4.removeAllChildren();
        stage.removeAllChildren();

        shipDead = false;
        gameRunning = false;
        console.log(stage);
        powerUp = false;

        drawStartScreen(point1);

        e.remove();

    }

    else {

        for (var i = 0; i < explosions.children.length; i++) {

            explosions.removeChildAt(i);
            stage.update();
            console.log("ENEMY DOWN!");

        }
        e.remove();
    }
}

function checkLevel(){

    if(point >= enemiesOnLevel){

        console.log("NEW LEVEL!");
        enemiesOnLevel = enemiesOnLevel+10;
        enemySpawning++;
        enemySpeed++;
        textLevel = new createjs.Text("Level: " + enemySpawning, "40px Arial","#FF0000");

        textLevel.x = 350;
        textLevel.y = 400;


        stage.addChild(textLevel);
        createjs.Sound.play("nextlevel");
        tweenText(textLevel);

        console.log(enemySpawning);
    }
}
function tweenText() {
    textLevel.alpha = 1;
    createjs.Tween.get(textLevel)
        .wait(500)
        .to({alpha: 0, visible: false}, 3000)
        .call(handleComplete);
    console.log(textLevel);
    function handleComplete() {
        //Tween complete
        stage.removeChild(textLevel);
    }
}

function spawnEnemies(){



    switch(enemySpawning) {
        case 1 :
            if (timerE >= 120 ) {


                drawEnemies();
                timerE = 0;

            }
            break;
        case 2 :
            if (timerE >= 100) {


                drawEnemies();
                timerE = 0;

            }
            break;
        case 3 :
            if (timerE >= 80) {


                drawEnemies();
                timerE = 0;

            }
            break;
        case 4 :
            if (timerE >= 60) {


                drawEnemies();
                timerE = 0;

            }
            break;
        case 5 :
            if (timerE >= 40) {


                drawEnemies();
                timerE = 0;

            }
            break;
        case 6 :
            if (timerE >= 30) {


                drawEnemies();
                timerE = 0;

            }
            break;
        case 7 :
            if (timerE >= 20) {


                drawEnemies();
                timerE = 0;

            }
            break;

        case 8 :
            if (timerE >= 10) {


                drawEnemies();
                timerE = 0;

            }
            break;

        case 9:
            textLevel = new createjs.Text("YOU WIN!!","20px Arial","#FF0000");
            textLevel.x = 320;
            textLevel.y = 300;

            stage.addChild(textLevel);

           if(timerE >=300) {

               var point1 = point;

               pellets.removeAllChildren();
               enemies.removeAllChildren();
               powerUps.removeAllChildren();
               astaroids.removeAllChildren();
               astaroids2.removeAllChildren();
               astaroids3.removeAllChildren();
               astaroids4.removeAllChildren();
               stage.removeAllChildren();
               enemySpeed = 2;
               shipDead = false;
               gameRunning = false;
               console.log(stage);
               powerUp = false;
               timerE = 0;
               enemySpawning = 1;
               ammoPU = 0;
               enemiesOnLevel = 10;

               drawStartScreen(point1);

           }

            break;
    }

}

function onTick(e)
{
    if(gameRunning){

        shipPosition();
        moveShip();
        enemyShoot();
        shoot();

        movePellet();
        movePowerUp();
        enemyMove();
        guiDisplay();


        moveAstaroid();
        moveAstaroid2();
        moveAstaroid3();
        moveAstaroid4();
        asteroidChecker();
        checkLevel();
        spawnEnemies();
        collisionHandler();


        timer = timer + 1;
        timerE = timerE +1;
        timerA = timerA +1;
        timerA1 = timerA1 +1;
        timerA2 = timerA2 +1;
        timerA3 = timerA3 +1;
        timerPUP = timerPUP +1;
        enemyPelletTimer = enemyPelletTimer+1;

    }

    stage.update(e);
}


