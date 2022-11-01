import 'phaser';
import Boot from './scenes/Boot';
import Game from './scenes/Game';
import Preload from './scenes/Preload';

var config = {

    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: '#4488aa',
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 320,
        parent: 'phaser-game',
    },
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    
    scene: [
        Boot,
        Preload,
        Game
    ]
};

const GAME = new Phaser.Game(config);