import States from "consts/States";
import WorldConsts from "consts/WorldConsts";
import Counter from "components/Counter";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import PreyViewer from "characters/prey/PreyViewer";
import PreyController from "characters/prey/PreyController";
import BeeModel from "models/BeeModel";

class PreySpawner {

    constructor(scene) {

        this.scene = scene;
        this.preyModel = BeeModel;

        this.activePrey = [];
        this.maxActive = 10;

        this.spawned = 0;
        this.spawnLimit = Phaser.Math.Between(20, 30);
        
        this.spawnX = 0;
        this.spawnY = WorldConsts.GROUND_Y - 24;    // 24 - buffer to stop sprites appearing underground

        this.counter = Counter.New().setRepeating(true).setMaxCount(1250);
        this.cooldown = Counter.New().setRepeating(true).setMaxCount(23000).setActive(false);
    }

    update(time, delta) {

        for (let i=this.activePrey.length; --i>=0;) {
            let bird = this.activePrey[i];
            if (bird.isState(States.FROZEN))
                this.activePrey.splice(i, 1);
        }

        this.counter.setActive(this.activePrey.length < this.maxActive && (this.spawned < this.spawnLimit));
        if (this.counter.updateAndCheck(time, delta))
            this.spawnPrey();

        if (this.cooldown.updateAndCheck(time, delta))
            this.setSpawning();
    }

    setCooldown() {
        this.counter.setActive(false);
        this.cooldown.setActive(true);
    }

    setSpawning() {
        if (this.scene.isAllHousesComplete()) {
            this.spawned = 0;
            this.counter.setActive(true);
            this.cooldown.setActive(false);
        }
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

        this.activePrey.push(bird);

        this.spawned ++;
        if (this.spawned >= this.spawnLimit)
            this.setCooldown();
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