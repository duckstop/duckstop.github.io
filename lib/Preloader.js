/**
 * Created by Don Cremo on 14-01-2015.
 */
"use strict"
Game.Preloader = {

    queue: new createjs.LoadQueue(true),

    preloadText: new createjs.Text("", "100px Arial", "#FF0000"),
    preload:function(){

        this. queue.on("progress", this.progress, this);
        this.queue.on("complete", Game.gameloaded);
        this.queue.on("error", this.error);
        this.queue.installPlugin(createjs.Sound);
        Game.Preloader.queue.loadManifest(

         [  {id: "asta", src: "./img/asta.png"},
            {id: "asta2", src: "./img/asta2.png"},
             {id: "asta3", src: "./img/asta3.png"},
             {id: "asta4", src: "./img/asta4.png"},
             {id: "bg", src: "./img/bg.jpg"},
             {id: "enemy", src: "./img/enemy.png"},
             {id: "explosion", src: "./img/explosion.png"},
             {id: "redshot", src: "./img/redshot.png"},
             {id: "blueshot", src: "./img/blueshot.png"},
             {id: "spaceship", src: "./img/spaceship.png"},
             {id: "explo", src: "./sound/explo.mp3"},
             {id: "pew", src: "./sound/pew.mp3"},
             {id: "powerup", src: "./sound/powerup.mp3"},
             {id: "nextlevel", src: "./sound/nextlevel.mp3"}


         ]);
        console.log(Game.Preloader.queue);
    },

    progress: function(e){

        var precent = Math.round(e.progress*100);
        this.preloadText.text = "LOADING...." + precent + "%";
        Game.stage.addChild(precent);
        console.log(precent);
        Game.stage.update();

    },

    error:function(e){

        console.log("ERROR"+ e.name);

    }



};