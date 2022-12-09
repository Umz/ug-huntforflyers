import Animations from "../consts/Animations";
import GameSave from "../components/GameSave";
import Textures from "../consts/Textures";
import Consts from "../consts/Consts";

class Preload extends Phaser.Scene {

    constructor() {
        super(Consts.PRELOAD_SCENE);
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
        this.createGraphics();
        this.createBirdAnimations();
        this.scene.start(Consts.MENU_SCENE);
    } 

    update(time, delta) {
    }

    createBirdAnimations() {

        let blueBird = { key: Animations.BLUE_BIRD , frames: this.anims.generateFrameNames('flyers', { prefix: 'bluebird', start:1, end: 6}), frameRate: 12, repeat: -1 };
        let redBird = { key: Animations.RED_BIRD , frames: this.anims.generateFrameNames('flyers', { prefix: 'redbird', start:1, end: 4}), frameRate: 8, repeat: -1 };
        let fairy = { key: Animations.FAIRY , frames: this.anims.generateFrameNames('flyers', { prefix: 'fairy', start:1, end: 4}), frameRate: 8, repeat: -1 };
        let bee = { key: Animations.BEE , frames: this.anims.generateFrameNames('flyers', { prefix: 'bee', start:1, end: 3}), frameRate: 16, repeat: -1 };
        let bat = { key: Animations.BAT , frames: this.anims.generateFrameNames('flyers', { prefix: 'bat', start:1, end: 4}), frameRate: 12, repeat: -1 };
        let bug = { key: Animations.BUG , frames: this.anims.generateFrameNames('flyers', { prefix: 'bug', start:1, end: 3}), frameRate: 16, repeat: -1 };

        this.anims.create(blueBird);
        this.anims.create(redBird);
        this.anims.create(fairy);
        this.anims.create(bee);
        this.anims.create(bat);
        this.anims.create(bug);
    }

    createGraphics() {
        let graphics = this.add.graphics();

        CreateBlankSquare: {
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(0, 0, 2, 2);
            graphics.generateTexture(Textures.BLACK_SQUARE, 2, 2);
        };

        graphics.destroy();
    }
};
export default Preload;