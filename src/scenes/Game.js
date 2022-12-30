import SpriteBuilder from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import WorldConsts from "../consts/WorldConsts";
import BackgroundBuilder from "../background/BackgroundBuilder";
import Dom from "../components/Dom";
import Consts from "../consts/Consts";
import States from "../consts/States";
import GameSave from "../components/GameSave";
import LevelMapper from "../mappers/LevelMapper";
import BirdSpawner from "../spawner/BirdSpawner";
import UpdateRunner from "../components/UpdateRunner";
import Depths from "../consts/Depths";
import Buildings from "../consts/Buildings";
import Animations from "../consts/Animations";
import Collector from "../collector/Collector";
import BGAnimations from "../background/BGAnimations";
import Civilian from "../civilian/Civilian";
import DomSceneControl from "../components/DomSceneControl";
import SpritePhysics from "../components/SpritePhysics";
import PlayerSpawner from "../spawner/PlayerSpawner";
import CivilianSpawner from "../spawner/CivilianSpawner";

class Game extends Phaser.Scene {

    constructor() {
        super(Consts.GAME_SCENE);
    }

    create(data) {

        const CURRENT_STAGE = GameSave.GetStage();

        this.levelData = LevelMapper.GetLevelData(CURRENT_STAGE);
        this.buildings = new Map();
        this.updateRunner = new UpdateRunner();
        
        const LEVEL_WIDTH = this.levelData.LENGTHS * WorldConsts.WIDTH;
        this.physics.world.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);
        this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);

        this.platforms = this.physics.add.group({ immovable: true });
        this.liveBirdGroup = this.add.group();
        this.bgBirdGroup = this.add.group({runChildUpdate:true});
        this.spriteUpdateGroup = this.add.group({ runChildUpdate: true });
        this.bulletGroup = this.physics.add.group({
            defaultKey: 'bullet',
            runChildUpdate: true,
            maxSize: 5
        });
        
        this.collisionGroupPlayers = this.physics.add.group();
        this.collisionGroupEnemies = this.physics.add.group();
        this.collisionGroupBullets = this.physics.add.group();
        this.collisionGroupWaterPump = this.physics.add.group();
        this.collisionGroupCollectors = this.physics.add.group();
        this.collisionGroupCivilians = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.collisionGroupPlayers);
        this.physics.add.collider(this.platforms, this.collisionGroupEnemies);
        this.physics.add.collider(this.platforms, this.collisionGroupCollectors);
        this.physics.add.collider(this.platforms, this.collisionGroupCivilians);

        this.physics.add.collider(this.collisionGroupPlayers, this.collisionGroupEnemies, this.collidePlayerPrey, null, this);

        this.physics.add.overlap(this.collisionGroupBullets, this.collisionGroupEnemies, this.overlapBulletPrey, null, this);
        this.physics.add.overlap(this.collisionGroupWaterPump, this.collisionGroupEnemies, this.overlapWaterPump, null, this);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        this.controlpad.action = ()=>{
            if (this.player.isStateEquals(States.NORMAL)) {
                this.player.fireBullet();
                this.fireBullet();
            }
        }
        this.updateRunner.add(this.controlpad);

        let ps = new PlayerSpawner(this);
        this.civSpawner = new CivilianSpawner(this);

        DomSceneControl.SetGameSceneControl(this);
        
        this.addBackground();
        
        this.player = ps.spawnPlayer();
        for (let i=0; i<5; i++)
            ps.spawnCollector();

        for (let forest of this.levelData.FORESTS) {
            if (forest.hasEnemies()) {
                let birdSpawner = new BirdSpawner(this);
                birdSpawner.setX(forest.getCenterX());
                birdSpawner.setBirdType(forest.getEnemyType());
                this.updateRunner.add(birdSpawner);
            }
        }       
    }

    update(time, delta) {
        this.updateRunner.update(time, delta);
    }

    overlapBulletPrey(bullet, enemy) {
        if (enemy.parent.isStateEquals(States.NORMAL)) {
            
            this.collisionGroupBullets.remove(bullet);
            this.liveBirdGroup.remove(enemy);
            bullet.setActive(false).setVisible(false);
            enemy.freeze();

            this.setPreyFrozenCollision(enemy);

            // To collect
            let all = this.collisionGroupCollectors.getChildren();
            let available = all.filter(sprite => sprite.parent.isStateEquals(States.NORMAL));

            let collector = this.physics.closest(enemy, available);
            if (collector) {
                collector.parent.setToCollect(enemy.parent);
            }

        }
    }

    overlapWaterPump(pump, prey) {
        pump.anims.play(Animations.WATER_PUMPING);
        if (prey.parent.isStateEquals(States.FROZEN)) {
            // Absorbtion
            GameSave.IncScore(prey.parent.getValue());
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
            prey.setActive(false).setVisible(false);
            this.collisionGroupEnemies.remove(prey);
        }
    }

    collidePlayerPrey(player, prey) {
        (prey.parent.isStateEquals(States.FROZEN))
            prey.setY(WorldConsts.GROUND_Y - prey.height * .7);
    }

    addPlayerToGroups(sprite) {
        this.spriteUpdateGroup.add(sprite);
        this.collisionGroupPlayers.add(sprite);
    }

    addCollectorToGroups(sprite) {
        this.spriteUpdateGroup.add(sprite);
        this.collisionGroupCollectors.add(sprite);
    }

    addGroundPhysics(sprite) {
        SpritePhysics.AddPhysics(sprite);
    }

    addBirdToGroups(sprite) {
        this.liveBirdGroup.add(sprite);
        this.spriteUpdateGroup.add(sprite);
        this.collisionGroupEnemies.add(sprite);
    }
    
    addFlightPhysics(sprite) {
        SpritePhysics.AddFlightPhysics(sprite);
        this.setPreyFlyingcollision(sprite);
    }

    addPlayerControls(player) {

        player.getSprite().body.checkCollision.up = false;  //  Refactor

        this.controlpad.addControlTarget(player.controller);
        this.cameras.main.startFollow(player.getSprite());
    }

    addCivilianToGroups(sprite) {
        this.spriteUpdateGroup.add(sprite);
        this.collisionGroupCivilians.add(sprite);
    }

    fireBullet() {
        
        let target = this.getClosestBirdTarget(this.player);
        let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, target.x, target.y);
        let bullet = this.bulletGroup.get(this.player.x, this.player.y);
        if (bullet) {
            bullet.update = function(time, delta) {
                if (this.body.velocity.y === 0) {
                    this.scene.physics.velocityFromRotation(angle, WorldConsts.HEIGHT * 1.5, this.body.velocity);
                    this.setAngularVelocity(360)
                }
                if (!this.scene.cameras.main.worldView.contains(this.x, this.y))
                    this.setActive(false).setVisible(false);
            }
            bullet.setActive(true).setVisible(true).setDepth(Depths.PLAYER_BULLETS);
            bullet.setSize(8, 8).refreshBody();
            this.collisionGroupBullets.add(bullet);
        }
    }

    getClosestBirdTarget(player) {

        let overhead = new Phaser.Geom.Point(this.player.x, this.player.y - 32);
        let maxDist = WorldConsts.WIDTH * .5;
        let target = this.physics.closest(player, this.liveBirdGroup.getChildren());

        if (target && Math.abs(target.x - player.x) < maxDist)
            return target;
        else
            return overhead;
    }

    getLiveBirdsCount() {
        return this.collisionGroupEnemies.countActive();
    }

    setPreyFlyingcollision(sprite) {
        sprite.body.checkCollision.left = false;
        sprite.body.checkCollision.right = false;
    }

    setPreyFrozenCollision(sprite) {
        let waterPump = this.buildings.get(Buildings.WATER_PUMP);
        let canPushLeft = (waterPump.x < sprite.x);
        let canPushRight = (waterPump.x > sprite.x);
        sprite.body.checkCollision.left = canPushRight;
        sprite.body.checkCollision.right = canPushLeft;

        SpritePhysics.AddGroundDrag(sprite);
    }

    setPreyCarriedCollisions(sprite) {
        sprite.body.checkCollision.left = false;
        sprite.body.checkCollision.right = false;
    }

    setPreyCarriedDepth(sprite) {
        sprite.setDepth(Depths.ENEMIES_CARRIED);
    }

    addBackground() {

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);

        let mapTypes = [Buildings.WATER_PUMP];
        let houseTypes = [Buildings.TENT1, Buildings.TENT2, Buildings.TENT3, Buildings.HUT, Buildings.HOUSE1];

        for (let building of this.levelData.BUILDINGS) {

            let sprite = BackgroundBuilder.addBuilding(this, building);

            if (mapTypes.find(type => type === building.type))
                this.buildings.set(building.type, sprite);

            if (houseTypes.find(type => type === building.type))
                this.civSpawner.spawnCivilian(building);
        }

        this.addBuldingCollisions();

        for (let forest of this.levelData.FORESTS)
            BackgroundBuilder.addForest(this, forest);
            
        //  ADD the ground - physics
        let levelWidth = this.levelData.LENGTHS * WorldConsts.WIDTH;
        let ground = this.add.rectangle(0, WorldConsts.GROUND_Y, levelWidth, 10, 0x000000).setOrigin(0).setVisible(false);
        this.physics.add.existing(ground);
        this.platforms.add(ground);

        let backgroundAnimations = new BGAnimations(this, this.bgBirdGroup);
        this.updateRunner.add(backgroundAnimations);
    }

    addBuldingCollisions() {
        let pump = this.buildings.get(Buildings.WATER_PUMP);
        this.collisionGroupWaterPump.add(pump);
    }

    getBuilding(type) {
        let found = this.levelData.BUILDINGS.find(building => building.isTypeEquals(type));
        return found;
    }

}
export default Game;