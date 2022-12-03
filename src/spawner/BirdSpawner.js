import Counter from "../components/Counter";
import Prey from "../prey/Prey";

class BirdSpawner {

    //  How often to spawn a bird ()
    //  What type of bird to spawn (level data)
    //  Where to spawn the bird (level data)
    //  Max amount of birds to spawn (?)

    constructor(scene) {
        this.scene = scene;
        this.counter = Counter.New().setRepeating(true);
    }

    update(time, delta) {

        this.counter.update(time, delta);

        if (this.counter.isComplete())
            this.addBirdToScene();
    }

    addBirdToScene() {
        let bird = new Prey(this.scene);
        bird.init();

        this.scene.addBirdToGroups(bird.getSprite());
    }
}
export default BirdSpawner;