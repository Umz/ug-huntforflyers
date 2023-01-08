import Animations from "../consts/Animations";
import GameSave from "../components/GameSave";
import Textures from "../consts/Textures";
import Consts from "../consts/Consts";
import Sfx from "../consts/Sfx";

class Preload extends Phaser.Scene {

    constructor() {
        super(Consts.PRELOAD_SCENE);
    }

    preload() {

        this.load.setBaseURL('./assets/');

        this.load.atlas('background', 'background.png', 'background.json');
        this.load.atlas('flyers', 'flyers.png', 'flyers.json');
        this.load.atlas('sprites', 'sprites.png', 'sprites.json');

        this.load.audio(Sfx.BGM_MENU, `bgm/${Sfx.BGM_MENU}`);

        this.load.audio(Sfx.MENU_PLAY_BUTTON, `sfx/${Sfx.MENU_PLAY_BUTTON}`);
        this.load.audio(Sfx.HIT_PREY, `sfx/${Sfx.HIT_PREY}`);

        //  TESTER graphics
        this.load.image('tester', 'test/spr_tank.png');
    }

    create(data) {
        GameSave.Init();

        this.createGraphics();
        this.createBackgroundAnimations();
        this.createBirdAnimations();
        this.createAnimalAnimations();
        this.createSpriteAnimations();
        this.createCivilianAnimations();
        this.createMiscAnimations();

        this.scene.start(Consts.MENU_SCENE);
    } 

    update(time, delta) {
    }

    createBirdAnimations() {
        let birds = [
            { key: Animations.BLUE_BIRD , frames: this.anims.generateFrameNames('flyers', { prefix: 'bluebird', start:1, end: 6}), frameRate: 12, repeat: -1 },
            { key: Animations.RED_BIRD , frames: this.anims.generateFrameNames('flyers', { prefix: 'redbird', start:1, end: 4}), frameRate: 8, repeat: -1 },
            { key: Animations.FAIRY , frames: this.anims.generateFrameNames('flyers', { prefix: 'fairy', start:1, end: 4}), frameRate: 8, repeat: -1 },
            { key: Animations.BEE , frames: this.anims.generateFrameNames('flyers', { prefix: 'bee', start:1, end: 3}), frameRate: 16, repeat: -1 },
            { key: Animations.BAT , frames: this.anims.generateFrameNames('flyers', { prefix: 'bat', start:1, end: 4}), frameRate: 12, repeat: -1 },
            { key: Animations.BUG , frames: this.anims.generateFrameNames('flyers', { prefix: 'bug', start:1, end: 3}), frameRate: 16, repeat: -1 },
            { key: Animations.EAGLE , frames: this.anims.generateFrameNames('flyers', { prefix: 'eagle', start:1, end: 7}), frameRate: 8, repeat: -1 }
        ]
        for (let bird of birds)
            this.anims.create(bird);
    }

    createAnimalAnimations() {
        let animals = [
            { key: Animations.TOAD , frames: this.anims.generateFrameNames('sprites', { prefix: 'toad', start:1, end: 4}), frameRate: 6, repeat: -1 }
        ];
        for (let animal of animals)
            this.anims.create(animal);
    }

    createSpriteAnimations() {
        const sheet = 'sprites';
        let sprites = [
            { key: Animations.CK_IDLE , frames: this.anims.generateFrameNames(sheet, { prefix: 'spr_ck_idle', start:1, end:4}), frameRate: 8, repeat: -1 },
            { key: Animations.CK_HOLD , frames: this.anims.generateFrameNames(sheet, { prefix: 'spr_ck_hold', start:1, end:4}), frameRate: 8, repeat: -1 },
            { key: Animations.CK_RUN , frames: this.anims.generateFrameNames(sheet, { prefix: 'spr_ck_run', start:1, end:6}), frameRate: 10, repeat: -1 },
            { key: Animations.CK_CARRY , frames: this.anims.generateFrameNames(sheet, { prefix: 'spr_ck_carry', start:1, end:6}), frameRate: 10, repeat: -1 },

            { key: Animations.THIEF_FLY , frames: this.anims.generateFrameNames(sheet, { prefix: 'thief', start:2, end:3}), frameRate: 8, repeat: -1 },
            { key: Animations.COINER_RUN , frames: this.anims.generateFrameNames(sheet, { prefix: 'coiner', start:1, end:2}), frameRate: 10, repeat: -1 },
        ]
        for (let anim of sprites)
            this.anims.create(anim);
    }

    createCivilianAnimations() {
        let civilians = [
            { key: Animations.MUSLIM_IDLE , frames: this.anims.generateFrameNames('sprites', { prefix: 'spr_muslim_idle', start:1, end: 4}), frameRate: 5, repeat: -1 },
            { key: Animations.MUSLIM_RUN , frames: this.anims.generateFrameNames('sprites', { prefix: 'spr_muslim_run', start:1, end: 6}), frameRate: 9, repeat: -1 },
            { key: Animations.MUSLIMA_IDLE , frames: this.anims.generateFrameNames('sprites', { prefix: 'spr_muslima_idle', start:1, end: 4}), frameRate: 5, repeat: -1 },
            { key: Animations.MUSLIMA_RUN , frames: this.anims.generateFrameNames('sprites', { prefix: 'spr_muslima_run', start:1, end: 6}), frameRate: 9, repeat: -1 }
        ];
        for (let civ of civilians)
            this.anims.create(civ);
    }

    createBackgroundAnimations() {
        let pumpSlow = { key: Animations.WATER_PUMPING , frames: this.anims.generateFrameNames('background', { prefix: 'pump', start:1, end: 3}), frameRate: 12, repeat: 20 };
        this.anims.create(pumpSlow);
    }

    createMiscAnimations() {
        let fxs = [
            { key: Animations.FX_PUFF , frames: this.anims.generateFrameNames('background', { prefix: 'puff', start:1, end: 5}), frameRate: 16, repeat: 0, hideOnComplete: true },
        ];
        for (let fx of fxs)
            this.anims.create(fx);
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