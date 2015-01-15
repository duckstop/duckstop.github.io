/**
 * Created by Don Cremo on 14-01-2015.
 */
"use strict"
var Game ={
    stage: new createjs.Stage("game"),

        init: function(){

        this.Preloader.preload();

    },

    gameloaded:function(){

        Game.stage.removeChild(Game.Preloader.preloadText);

        Game.Main.start();
    }



};