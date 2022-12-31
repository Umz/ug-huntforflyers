import Civilian from "../civilian/Civilian";
import WorldConsts from "../consts/WorldConsts";
import Enemy from "../enemy/Enemy";

class EnemySpawner {
    
    constructor(scene) {
        this.scene = scene;
    }

    spawnEnemy(x, y) {

        let ene = new Enemy(this.scene);
        ene.init();
        ene.setPosition(x, y);

        //this.scene.addCivilianToGroups(civ.getSprite());
        //this.scene.addGroundPhysics(civ.getSprite());
    }
}
export default EnemySpawner;