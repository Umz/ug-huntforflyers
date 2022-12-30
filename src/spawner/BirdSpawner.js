import Counter from "../components/Counter";
import WorldConsts from "../consts/WorldConsts";
import BeeModel from "../models/BeeModel";
import Prey from "../prey/Prey";

class BirdSpawner {

    //  Max amount of birds to spawn (?)

    constructor(scene) {
        this.scene = scene;

        this.mainBirdType = BeeModel;
        
        this.spawned = 0;
        this.spawnLimit = 30;

        this.spawnMax = 10;
        this.spawnX = 0;
        this.spawnY = WorldConsts.GROUND_Y - 24;    // 24 - buffer to stop sprites appearing underground

        this.counter = Counter.New().setRepeating(true).setMaxCount(2000);
    }

    update(time, delta) {

        if (this.scene.getLiveBirdsCount() < this.spawnMax && this.spawnLimit > this.spawned)
            this.counter.update(time, delta);

        if (this.counter.isComplete())
            this.spawnBirdInScene();
    }

    spawnBirdInScene() {

        //let type = Phaser.Utils.Array.GetRandom([BlueBirdModel, RedBirdModel, FairyModel, BeeModel, BatModel, BugModel]);
        let type = BeeModel;

        let bird = new Prey(this.scene, this.mainBirdType);
        bird.init();
        bird.setHomePoint(this.spawnX, this.spawnY);

        this.scene.addBirdToGroups(bird.getSprite());
        this.scene.addFlightPhysics(bird.getSprite());

        this.spawned ++;
    }

    setX(x) {
        this.spawnX = x;
    }

    setBirdType(type) {
        this.mainBirdType = type;
    }

    setFrequencyInMillis(millis) {
        this.counter.setMaxCount(millis);
    }
}
export default BirdSpawner;