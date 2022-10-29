import 'phaser';
import Boot from './scenes/Boot';
import Game from './scenes/Game';

var config = {

    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 400,
        parent: 'phaser-game',
    },
    physics: {
        default: 'arcade'
    },
    
    scene: [
        Boot,
        Game
    ]
};

const GAME = new Phaser.Game(config);