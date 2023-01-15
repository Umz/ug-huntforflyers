import WorldConsts from "consts/WorldConsts";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";

class CivilianSpawner {
    
    constructor(scene) {
        this.scene = scene;
    }

    spawnCivilian(building) {

        let civ = SpriteBuilder.GetCivilianSprite();
        civ.setPosition(building.worldX, WorldConsts.GROUND_Y - 16);

        this.scene.addSpriteToSceneAndGroups(
            civ,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupCivilians
        );
        SpritePhysics.AddPhysics(civ);

        civ.setHome(building);
    }
}
export default CivilianSpawner;