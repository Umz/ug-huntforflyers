import 'phaser';
import Boot from './scenes/Boot';
import Game from './scenes/Game';
import MenuScene from './scenes/MenuScene';
import Preload from './scenes/Preload';
import WorldConsts from './WorldConsts';

var config = {

    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: '#3e1e00',
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: WorldConsts.WIDTH,
        height: WorldConsts.HEIGHT,
        parent: 'phaser-game',
    },
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    
    scene: [
        Boot,
        Preload,
        MenuScene,
        Game
    ]
};

const GAME = new Phaser.Game(config);