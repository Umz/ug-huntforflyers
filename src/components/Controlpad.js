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
    }

    addControlTarget(IControllable) {
        this.controlTarget = IControllable;
    }

    addKeyboardControl() {
        const scene = this.scene;
        scene.input.keyboard.on('keydown-LEFT', (event) => { this.LEFT = true; });
        scene.input.keyboard.on('keyup-LEFT', (event) => { this.LEFT = false });
        scene.input.keyboard.on('keydown-RIGHT', (event) => { this.RIGHT = true });
        scene.input.keyboard.on('keyup-RIGHT', (event) => { this.RIGHT = false });
        scene.input.keyboard.on('keydown-ENTER', (event) => { this.action() });
        scene.input.keyboard.on('keydown-DOWN', (event) => { this.weaponSwap() });
        scene.input.keyboard.on('keydown-Z', (event) => { this.action() });

        scene.input.keyboard.on('keydown-A', (event) => { this.LEFT = true; });
        scene.input.keyboard.on('keyup-A', (event) => { this.LEFT = false });
        scene.input.keyboard.on('keydown-D', (event) => { this.RIGHT = true });
        scene.input.keyboard.on('keyup-D', (event) => { this.RIGHT = false });
        scene.input.keyboard.on('keydown-S', (event) => { this.action() });
        scene.input.keyboard.on('keydown-E', (event) => { this.weaponSwap() });

        scene.input.keyboard.on('keydown-W', (event) => {
            const target = this.controlTarget.target;
            const tileX = Math.floor(target.x / WorldConsts.TILE_WIDTH);
            addChatMessage('Professor', `Standing at tile ${tileX}`)
        });
        scene.input.keyboard.on('keydown-UP', (event) => {
            const target = this.controlTarget.target;
            const tileX = Math.floor(target.x / WorldConsts.TILE_WIDTH);
            addChatMessage('Professor', `Standing at tile ${tileX}`)
        });

        scene.input.keyboard.on('keydown-P', (event) => {
            GameSave.IncScore(101);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
        });

        scene.input.keyboard.on('keydown-L', (event) => {
            scene.showIcon(scene.player, 2000, 'decor_sign2')
            console.log('Level Complete?', scene.isAllHousesComplete())
        });

        scene.input.keyboard.on('keydown-ONE', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE1 }) });
        scene.input.keyboard.on('keydown-TWO', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE2 }) });
        scene.input.keyboard.on('keydown-THREE', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE3 }) });
        scene.input.keyboard.on('keydown-FOUR', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE4 }) });
        scene.input.keyboard.on('keydown-FIVE', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE5 }) });
        scene.input.keyboard.on('keydown-SIX', (event) => { scene.scene.launch(Consts.LOAD_SCENE, {stageData: Levels.STAGE6 }) });
    }

    action() {
        if (this.controlTarget)
            this.controlTarget.doAction();
    }

    weaponSwap() {
    }

    update(time, delta) {
        const target = this.controlTarget;
        if (target)
            if (this.LEFT)
                target.moveLeft();
            else if (this.RIGHT)
                target.moveRight();
    }
}
export default Controlpad;