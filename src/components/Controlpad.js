import Consts from "../consts/Consts";
import Levels from "../consts/Levels";
import WorldConsts from "../consts/WorldConsts";
import GameSave from "./GameSave";
import Dom from './Dom';

/** Class that configures any input device to the Player control */
class Controlpad {

    constructor(scene) {
        this.scene = scene;
        this.LEFT = false;
        this.RIGHT = false;
        this.active = true;
    }

    addControlTarget(playerController) {
        this.controlTarget = playerController;
    }

    addKeyboardControl() {

        let scene = this.scene;
        let rightKeys = ['RIGHT', 'D'];
        let leftKeys = ['LEFT', 'A'];
        let upKeys = ['UP', 'W'];
        let downKeys = ['DOWN', 'S'];

        let actionKeys = ['ENTER', 'Z', 'SPACE'];

        for (let key of rightKeys) {
            scene.input.keyboard.on(`keydown-${key}`, (event) => { this.RIGHT = this.active });
            scene.input.keyboard.on(`keyup-${key}`, (event) => { this.RIGHT = false });
        }

        for (let key of leftKeys) {
            scene.input.keyboard.on(`keydown-${key}`, (event) => { this.LEFT = this.active });
            scene.input.keyboard.on(`keyup-${key}`, (event) => { this.LEFT = false });
        }

        for (let key of upKeys)
            scene.input.keyboard.on(`keydown-${key}`, (event) => {
                const target = this.controlTarget.sprite;
                const tileX = Math.floor(target.x / WorldConsts.TILE_WIDTH);
                //Dom.AddChatMessage('Professor', `Standing at tile ${tileX}`)
                if (this.active)
                    this.interact();
            });

        for (let key of downKeys)
            scene.input.keyboard.on(`keydown-${key}`, (event) => {
                 if (this.active)
                    this.weaponSwap()
                //  HACK - hiding the grave view - terrible hack (please remove and improve)
                else
                    this.scene.closeMenu();
            });

        for (let key of actionKeys) {
            scene.input.keyboard.on(`keydown-${key}`, (event) => { if (this.active) this.action() });
            scene.input.keyboard.on(`keyup-${key}`, (event) => {
                this.scene.player.controller.isFireReady = true;    // HACK
            });
        }

        scene.input.keyboard.on('keydown-O', (event) => {
            GameSave.SetScore(0);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
        });

        scene.input.keyboard.on('keydown-P', (event) => {
            GameSave.IncScore(101);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
        });

        scene.input.keyboard.on('keydown-L', (event) => {
            for (let i=0; i<10; i++)
                this.scene.addCoin(3);
        });

        scene.input.keyboard.on('keydown-I', (event) => {
            this.scene.player.hit(300);
            this.scene.playerDie();
        });

        scene.input.keyboard.on('keydown-K', (event) => {
            this.scene.smokeEmitter.explode(8, 140, 80);
        });

        scene.input.keyboard.on('keydown-ONE', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE1 }) });
        scene.input.keyboard.on('keydown-TWO', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE2 }) });
        scene.input.keyboard.on('keydown-THREE', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE3 }) });
        scene.input.keyboard.on('keydown-FOUR', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE4 }) });
        scene.input.keyboard.on('keydown-FIVE', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE5 }) });
        scene.input.keyboard.on('keydown-SIX', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE6 }) });
        scene.input.keyboard.on('keydown-SEVEN', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE7 }) });
    }

    action() {
    }

    weaponSwap() {
    }

    interact() {}

    update(time, delta) {
        const target = this.controlTarget;
        if (target && this.active)
            if (this.LEFT)
                target.moveLeft();
            else if (this.RIGHT)
                target.moveRight();
    }

    setActive(b) { this.active = b; }
}
export default Controlpad;