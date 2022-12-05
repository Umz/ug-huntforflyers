import Counter from "../components/Counter";
import WorldConsts from "../consts/WorldConsts";
import BatModel from "../models/BatModel";
import BeeModel from "../models/BeeModel";
import BlueBirdModel from "../models/BlueBirdModel";
import FairyModel from "../models/FairyModel";
import RedBirdModel from "../models/RedBirdModel";
import Prey from "../prey/Prey";

class BirdSpawner {

    //  What type of bird to spawn (level data)
    //  Max amount of birds to spawn (?)

    constructor(scene) {
        this.scene = scene;
        
        this.spawnMax = 10;
        this.spawnX = 0;
        this.spawnY = WorldConsts.GROUND_Y - 24;    // 24 - buffer to stop sprites appearing underground

        this.counter = Counter.New().setRepeating(true).setMaxCount(2000);
    }

    update(time, delta) {

        if (this.scene.getLiveBirdsCount() < this.spawnMax)
            this.counter.update(time, delta);

        if (this.counter.isComplete())
            this.spawnBirdInScene();
    }

    spawnBirdInScene() {

        let type = Phaser.Utils.Array.GetRandom([BlueBirdModel, RedBirdModel, FairyModel, BeeModel, BatModel]);
        //let type = BatModel;

        let bird = new Prey(this.scene, type);
        bird.init();
        bird.setHomePoint(this.spawnX, this.spawnY);

        this.scene.addBirdToGroups(bird.getSprite());
        this.scene.addFlightPhysics(bird.getSprite());
    }

    setX(x) {
        this.spawnX = x;
    }

    setFrequencyInMillis(millis) {
        this.counter.setMaxCount(millis);
    }
}
export default BirdSpawner;