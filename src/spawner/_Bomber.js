import Spawner from "../classes/Spawner";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import SkyBomberModel from "models/SkyBomberModel";
import SkyBomberView from "../characters/enemy/SkyBomberView";
import SkyBomberCtrl from "../characters/enemy/SkyBomberCtrl";

class _Bomber extends Spawner {

    constructor(scene) {
        super(scene, scene.collisionGroupSkyBombers);
        this.setSeconds(25).setMaxAlive(3);
    }

    spawn() {

        let x = Phaser.Math.Between(32, this.scene.getLevelWidth() - 32);
        let y = -24;

        let ene = SpriteBuilder.GetEnemy(SkyBomberModel);
        ene.setModel(SkyBomberModel);
        ene.setView(new SkyBomberView(ene));
        ene.setController(new SkyBomberCtrl(ene));
        ene.setPosition(x, y);

        this.scene.addSpriteToSceneAndGroups(
            ene,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupSkyBombers,
            this.scene.liveSkyEnemies
        )
        SpritePhysics.AddFlightPhysicsNoBounds(ene);
    }
    
}
export default _Bomber;