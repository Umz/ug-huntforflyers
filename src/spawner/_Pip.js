import Spawner from "../classes/Spawner";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import CoinerModel from "models/CoinerModel";
import CoinerCtrl from "characters/enemy/CoinerCtrl";
import CoinerView from "characters/enemy/CoinerView";
import Sfx from "../consts/Sfx";
import WorldConsts from "consts/WorldConsts";
import BackgroundBuilder from "background/BackgroundBuilder";
import Buildings from "consts/Buildings";

class _Pip extends Spawner {

    constructor(scene) {
        super(scene, scene.collisionGroupCoiners);
        this.setSeconds(33).setMaxAlive(4);
    }

    spawn() {

        let camera = this.scene.cameras.main;
        let width = WorldConsts.WIDTH;

        let waterPump = this.scene.getBuilding(Buildings.WATER_PUMP);
        let multiplier = Math.random() > .5 ? 1 : -1;
        let distance = Phaser.Math.Between(width * .25, width * .45);
        let spawnX = waterPump.worldX + (distance * multiplier);

        let coiner = SpriteBuilder.GetEnemy(CoinerModel);
        coiner.setModel(CoinerModel);
        coiner.setView(new CoinerView(coiner));
        coiner.setController(new CoinerCtrl(coiner));
        
        coiner.setPosition(spawnX, WorldConsts.GROUND_Y - 8);
        coiner.controller.setPoint(spawnX);

        this.scene.addSpriteToSceneAndGroups(
            coiner,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupCoiners,
        )
        SpritePhysics.AddPhysics(coiner);
        
        //  Show FX
        BackgroundBuilder.AddMound(this.scene, spawnX);
        this.scene.soundManager.play(Sfx.COINER_APPEAR);
    }

}
export default _Pip;