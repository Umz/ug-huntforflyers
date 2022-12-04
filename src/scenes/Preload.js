import Animations from "../consts/Animations";
import GameSave from "../components/GameSave";

class Preload extends Phaser.Scene {

    constructor() {
        super('Preload');
    }

    init() {
        // Fonts prep,
    }

    preload() {

        this.load.setBaseURL('./assets/');
        //https://umzgames.com/demo/farb2/

        this.load.atlas('background', 'background.png', 'background.json');
        this.load.atlas('flyers', 'flyers.png', 'flyers.json');

        //  TESTER graphics
        this.load.image('tester', 'test/spr_tank.png');
        this.load.image('bullet', 'test/fg_star.png');
    }

    create(data) {
        GameSave.Init();
        this.createBirdAnimations();
        this.scene.start('MenuScene');
    } 

    update(time, delta) {
    }

    createBirdAnimations() {

        let blueBird = { key: Animations.BLUE_BIRD , frames: this.anims.generateFrameNames('flyers', { prefix: 'bluebird', start:1, end: 6}), frameRate: 12, repeat: -1 };
        let redBird = { key: Animations.RED_BIRD , frames: this.anims.generateFrameNames('flyers', { prefix: 'redbird', start:1, end: 4}), frameRate: 8, repeat: -1 };
        let fairy = { key: Animations.FAIRY , frames: this.anims.generateFrameNames('flyers', { prefix: 'fairy', start:1, end: 4}), frameRate: 8, repeat: -1 };

        this.anims.create(blueBird);
        this.anims.create(redBird);
        this.anims.create(fairy);
    }
};
export default Preload;