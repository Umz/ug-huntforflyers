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
import SkyBomberModel from "models/SkyBomberModel";
import SkyBomberView from "../characters/enemy/SkyBomberView";
import SkyBomberCtrl from "../characters/enemy/SkyBomberCtrl";

class EnemySpawner {
    
    constructor(scene) {

        this.scene = scene;
        this.maxAlive = 5;

        this.thiefCounter = Counter.New().setRepeating(true).setMaxCount(13 * 1000);
        this.coinerCounter = Counter.New().setRepeating(true).setMaxCount(15 * 1000);
        this.skybomberCounter = Counter.New().setRepeating(true).setMaxCount(21 * 1000);
    }

    update(time, delta) {

        this.thiefCounter.setActive(this.getGroupCount(this.scene.collisionGroupThieves) < this.maxAlive)
        this.thiefCounter.update(time, delta);
        if (this.thiefCounter.isComplete())
            this.spawnThief();

        this.coinerCounter.setActive(this.getGroupCount(this.scene.collisionGroupCoiners) < 5);
        this.coinerCounter.update(time, delta);
        if (this.coinerCounter.isComplete())
            this.spawnCoiner();

        this.skybomberCounter.setActive(this.getGroupCount(this.scene.collisionGroupSkyBombers) < 3);
        this.skybomberCounter.update(time, delta);
        if (this.skybomberCounter.isComplete())
            this.spawnSkyBomber();
    }

    spawnThief() {

        let x = Phaser.Math.Between(32, this.scene.getLevelWidth() - 32);
        let y = -24;

        let ene = SpriteBuilder.GetEnemy(ThiefModel);
        ene.setModel(ThiefModel);
        ene.setView(new ThiefView(ene));
        ene.setController(new ThiefCtrl(ene));
        ene.setPosition(x, y);

        this.scene.addSpriteToSceneAndGroups(
            ene,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupThieves,
            this.scene.liveSkyEnemies
        )
        SpritePhysics.AddFlightPhysicsNoBounds(ene);
    }

    spawnCoiner() {

        let camera = this.scene.cameras.main;
        let width = WorldConsts.WIDTH;

        let waterPump = this.scene.getBuilding(Buildings.WATER_PUMP);
        let multiplier = Math.random() > .5 ? 1 : -1;
        let distance = Phaser.Math.Between(width * .25, width * .45);
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

    spawnSkyBomber() {

        let x = Phaser.Math.Between(32, this.scene.getLevelWidth() - 32);
        let y = -24;

        let ene = SpriteBuilder.GetEnemy(SkyBomberModel);
        ene.setModel(SkyBomberModel);
        ene.setView(new SkyBomberView(ene));
        ene.setController(new SkyBomberCtrl(ene));
        ene.setPosition(x, y);

        this.scene.addSpriteToSceneAndGroups(
            ene,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupSkyBombers,
            this.scene.liveSkyEnemies
        )
        SpritePhysics.AddFlightPhysicsNoBounds(ene);
    }

    getGroupCount(group) {
        return this.scene.getGroupActiveCount(group);
    }
}
export default EnemySpawner;