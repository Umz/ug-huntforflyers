import Counter from "components/Counter";
import WorldConsts from "consts/WorldConsts";
import BeeModel from "models/BeeModel";
import SpriteBuilder from "../components/SpriteBuilder";
import SpritePhysics from "../components/SpritePhysics";
import PreyViewer from "../characters/prey/PreyViewer";
import PreyController from "../characters/prey/PreyController";

class PreySpawner {

    //  Max amount of birds to spawn (?)

    constructor(scene) {
        this.scene = scene;

        this.preyModel = BeeModel;
        
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
            this.spawnPrey();
    }

    spawnPrey() {

        let bird = SpriteBuilder.GetPrey(this.preyModel);

        this.scene.addSpriteToSceneAndGroups(
            bird,
            this.scene.spriteUpdateGroup,
            this.scene.liveBirdGroup,
            this.scene.collisionGroupPrey,
        )
        SpritePhysics.AddFlightPhysics(bird);

        bird.setModel(this.preyModel);
        bird.setView(new PreyViewer(bird));
        bird.setController(new PreyController(bird));

        bird.init();
        bird.setHomePoint(this.spawnX, this.spawnY);
        bird.setFlyingCollision();

        this.spawned ++;
    }

    setX(x) {
        this.spawnX = x;
    }

    setBirdType(type) {
        this.preyModel = type;
    }

    setFrequencyInMillis(millis) {
        this.counter.setMaxCount(millis);
    }
}
export default PreySpawner;