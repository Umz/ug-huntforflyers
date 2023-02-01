import Spawner from "../classes/Spawner";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import ThiefModel from "models/ThiefModel";
import ThiefCtrl from "characters/enemy/ThiefCtrl";
import ThiefView from "characters/enemy/ThiefView";

class _Drone extends Spawner {

    constructor(scene) {
        super(scene, scene.collisionGroupThieves);
        this.setSeconds(3).setMaxAlive(5);
    }

    spawn() {

        let x = Phaser.Math.Between(32, this.scene.getLevelWidth() - 32);
        let y = -24;

        let ene = SpriteBuilder.GetEnemy(ThiefModel);
        ene.setModel(ThiefModel);
        ene.setView(new ThiefView(ene));
        ene.setController(new ThiefCtrl(ene));
        ene.setPosition(x, y);

        this.scene.addSpriteToSceneAndGroups(
            ene,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupThieves,
            this.scene.liveSkyEnemies
        )
        SpritePhysics.AddFlightPhysicsNoBounds(ene);

    }
}
export default _Drone;