import _Drone from "./_Drone";
import _Pip from "./_Pip";
import _Bomber from "./_Bomber";
import Characters from "consts/Characters";

class EnemySpawner {
    
    constructor(scene, enemies) {
        
        this.scene = scene;

        this.allSpawners = [];
        for (let type of enemies)
            this.addEnemySpawner(type);
    }

    update(time, delta) {
        for (let spawner of this.allSpawners)
            spawner.update(time, delta);
    }

    addEnemySpawner(type) {
        switch (type) {
            case Characters.DRONE:
                this.allSpawners.push(new _Drone(this.scene));
                break;
            case Characters.PIP:
                this.allSpawners.push(new _Pip(this.scene));
                break;
            case Characters.BOMBER:
                this.allSpawners.push(new _Bomber(this.scene));
                break;
        }
    }
}
export default EnemySpawner;