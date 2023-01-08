import Civilian from "characters/civilian/Civilian";
import WorldConsts from "consts/WorldConsts";

class CivilianSpawner {
    
    constructor(scene) {
        this.scene = scene;
    }

    spawnCivilian(building) {

        let civ = new Civilian(this.scene);
        civ.init();
        civ.setPosition(building.worldX, WorldConsts.GROUND_Y - 16);

        this.scene.addCivilianToGroups(civ.getSprite());
        this.scene.addGroundPhysics(civ.getSprite());

        civ.setHome(building);
    }
}
export default CivilianSpawner;