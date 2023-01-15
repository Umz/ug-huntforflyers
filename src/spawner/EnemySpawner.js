import Counter from "components/Counter";
import Enemy from "characters/enemy/Enemy";
import ThiefModel from "models/ThiefModel";
import ThiefCtrl from "characters/enemy/ThiefCtrl";
import ThiefView from "characters/enemy/ThiefView";
import CoinerModel from "models/CoinerModel";
import CoinerCtrl from "characters/enemy/CoinerCtrl";
import CoinerView from "characters/enemy/CoinerView";
import WorldConsts from "consts/WorldConsts";
import BackgroundBuilder from "background/BackgroundBuilder";
import Buildings from "consts/Buildings";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";

class EnemySpawner {
    
    constructor(scene) {
        this.scene = scene;
        this.maxAlive = 5;
        this.counter = Counter.New().setRepeating(true).setMaxCount(12 * 1000);
        this.counter.setActive(false);
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

        let camera = this.scene.cameras.main;
        let width = camera.width;

        let waterPump = this.scene.getBuilding(Buildings.WATER_PUMP);
        let multiplier = Math.random() > .5 ? 1 : -1;
        let distance = Phaser.Math.Between(width * .25, width * .5);
        let spawnX = waterPump.worldX + (distance * multiplier);

        let coiner = SpriteBuilder.GetEnemy(CoinerModel);
        coiner.setModel(CoinerModel);
        coiner.setView(new CoinerView(coiner));
        coiner.setController(new CoinerCtrl(coiner));
        
        coiner.setPosition(spawnX, WorldConsts.GROUND_Y - 8);

        coiner.controller.setPoint(spawnX);

        this.scene.addSpriteToSceneAndGroups(
            coiner,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupCoiners,
        )
        SpritePhysics.AddPhysics(coiner);
        
        //  Show FX
        let mound = BackgroundBuilder.AddMound(this.scene, spawnX);
    }
}
export default EnemySpawner;