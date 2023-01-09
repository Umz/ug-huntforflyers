import Counter from "components/Counter";
import Enemy from "characters/enemy/Enemy";
import ThiefModel from "models/ThiefModel";
import ThiefCtrl from "characters/enemy/ThiefCtrl";
import ThiefView from "characters/enemy/ThiefView";
import CoinerModel from "models/CoinerModel";
import CoinerCtrl from "characters/enemy/CoinerCtrl";
import CoinerView from "characters/enemy/CoinerView";
import WorldConsts from "consts/WorldConsts";
import BackgroundBuilder from "../background/BackgroundBuilder";
import Buildings from "../consts/Buildings";

class EnemySpawner {
    
    constructor(scene) {
        this.scene = scene;
        this.maxAlive = 5;
        this.counter = Counter.New().setRepeating(true).setMaxCount(12 * 1000);
        this.coinerCounter = Counter.New().setRepeating(true).setMaxCount(1 * 1000);
    }

    update(time, delta) {

        if (this.scene.getThiefCount() < this.maxAlive)
            this.counter.update(time, delta);

        if (this.counter.isComplete())
            this.spawnEnemy();

        if (this.scene.getCoinerCount() < 6)
            this.coinerCounter.update(time, delta);
        if (this.coinerCounter.isComplete())
            this.spawnCoiner();
    }

    spawnEnemy() {

        let x = Phaser.Math.Between(32, this.scene.getLevelWidth() - 32);
        let y = -24;

        let ene = new Enemy(this.scene, ThiefModel);
        ene.setController(new ThiefCtrl(ene));
        ene.setView(new ThiefView(ene));
        ene.init();
        ene.setPosition(x, y);

        this.scene.addThiefToGroups(ene.getSprite());
        this.scene.addBoundlessFlightPhysics(ene.getSprite());
    }

    spawnCoiner() {

        //  Spawn around the pump - min to max
        let pump = this.scene.getBuilding(Buildings.WATER_PUMP);
        let min = this.scene.getLevelWidth() * .2;
        let max = this.scene.getLevelWidth() * .4;
        let mul = Math.random() > .5 ? 1 : -1;
        let distance = Phaser.Math.Between(min, max);
        let x = pump.worldX + (distance * mul);

        let coiner = new Enemy(this.scene, CoinerModel);
        coiner.setController(new CoinerCtrl(coiner));
        coiner.setView(new CoinerView(coiner));
        coiner.init();
        coiner.setPosition(x, WorldConsts.GROUND_Y - 8);

        coiner.controller.setPoint(x);

        this.scene.addCoinerToGroups(coiner.getSprite());
        this.scene.addGroundPhysics(coiner.getSprite());

        //  Show FX
        let mound = BackgroundBuilder.AddMound(this.scene, x);
    }

    getEnemy(type, x, y) {
        // new > (model, ctrl, view) > init, x, y
    }
}
export default EnemySpawner;