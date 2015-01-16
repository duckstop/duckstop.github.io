/**
 * Created by Christoffer May Kierpaul og Teis Andersson on 07-01-2015.
 */
"use strict"
var Game ={
    stage: null,
    canvas: null,

    init: function(){

        this.stage = new createjs.Stage("game");
        this.canvas = document.getElementById("game");

        this.Preloader.preload();

    },





    gameloaded:function(){

        Game.stage.removeChild(Game.Preloader.preloadText);

        Game.Main.start();
    }



};