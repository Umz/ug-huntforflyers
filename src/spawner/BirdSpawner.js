import Counter from "../components/Counter";
import SpriteBuilder from "../components/SpriteBuilder";
import WorldConsts from "../consts/WorldConsts";
import BlueBirdModel from "../prey/BlueBirdModel";
import Prey from "../prey/Prey";

class BirdSpawner {

    //  What type of bird to spawn (level data)
    //  Max amount of birds to spawn (?)

    constructor(scene) {
        this.scene = scene;
        
        this.spawnX = 0;
        this.spawnY = WorldConsts.GROUND_Y - 24;    // 24 - buffer to stop sprites appearing underground

        this.counter = Counter.New().setRepeating(true).setMaxCount(2000);
    }

    update(time, delta) {

        this.counter.update(time, delta);

        if (this.counter.isComplete())
            this.spawnBirdInScene();
    }

    spawnBirdInScene() {

        let type = BlueBirdModel;

        let bird = new Prey(this.scene, type);
        bird.init();
        bird.setPosition(this.spawnX, this.spawnY);

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