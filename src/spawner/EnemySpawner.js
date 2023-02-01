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
import Sfx from "../consts/Sfx";
import _Drone from "./_Drone";
import Characters from "../consts/Characters";

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

        this.scene.soundManager.play(Sfx.COINER_APPEAR);
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

    addEnemySpawner(type) {
        switch (type) {
            case Characters.THIEF:
                this.allSpawners.push(new _Drone(this.scene));
                break;
        }
    }
}
export default EnemySpawner;