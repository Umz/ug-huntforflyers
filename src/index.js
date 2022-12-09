import 'phaser';
import Boot from './scenes/Boot';
import Game from './scenes/Game';
import Menu from './scenes/Menu';
import Preload from './scenes/Preload';
import Load from './scenes/Load';
import WorldConsts from './consts/WorldConsts';

//  Screen width fix (stretch if shorter)
const width = innerWidth;
const height = innerHeight;
const ratio = width / height;
const newWidth = Math.ceil(WorldConsts.HEIGHT * ratio);
WorldConsts.WIDTH = (ratio > 2) ? newWidth : WorldConsts.WIDTH;
WorldConsts.TILE_WIDTH = (WorldConsts.WIDTH / WorldConsts.TILES);

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
        Menu,
        Game,
        Load
    ]
};

const GAME = new Phaser.Game(config);
