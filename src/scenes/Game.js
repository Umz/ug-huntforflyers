import Controlpad from "components/Controlpad";
import Bullet from "classes/Bullet";
import WorldConsts from "consts/WorldConsts";
import BackgroundBuilder from "background/BackgroundBuilder";
import Dom from "components/Dom";
import Consts from "consts/Consts";
import States from "consts/States";
import GameSave from "components/GameSave";
import LevelMapper from "mappers/LevelMapper";
import BirdSpawner from "spawner/BirdSpawner";
import UpdateRunner from "components/UpdateRunner";
import Depths from "consts/Depths";
import Buildings from "consts/Buildings";
import Animations from "consts/Animations";
import BGAnimations from "background/BGAnimations";
import DomSceneControl from "components/DomSceneControl";
import SpritePhysics from "components/SpritePhysics";
import PlayerSpawner from "spawner/PlayerSpawner";
import CivilianSpawner from "spawner/CivilianSpawner";
import EnemySpawner from "spawner/EnemySpawner";
import Sfx from "consts/Sfx";
import SoundManager from "components/SoundManager";

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

        this.huntBulletGroup = this.physics.add.group({
            classType: Bullet,
            defaultKey: 'background',
            defaultFrame: 'bullet',
            runChildUpdate: true,
            maxSize: 5
        });

        this.attackBulletGroup = this.physics.add.group({
            classType: Bullet,
            defaultKey: 'background',
            defaultFrame: 'bulletBig',
            runChildUpdate: true,
            maxSize: 7
        });

        this.puffGroup = this.add.group({
            defaultKey: 'background',
            defaultFrame: 'puff1',
            runChildUpdate: true
        });

        this.coinGroup = this.physics.add.group({
            defaultKey: 'background',
            defaultFrame: 'coin'
        });
        
        this.collisionGroupPlayers = this.physics.add.group();
        this.collisionGroupEnemies = this.physics.add.group();
        this.collisionGroupThieves = this.physics.add.group();
        this.collisionGroupCoiners = this.physics.add.group();
        this.collisionGroupWaterPump = this.physics.add.group();
        this.collisionGroupCollectors = this.physics.add.group();
        this.collisionGroupCivilians = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.collisionGroupPlayers);
        this.physics.add.collider(this.platforms, this.collisionGroupCollectors);
        this.physics.add.collider(this.platforms, this.collisionGroupCivilians);
        this.physics.add.collider(this.platforms, this.collisionGroupCoiners);
        this.physics.add.collider(this.platforms, this.coinGroup);
        
        this.physics.add.collider(this.platforms, this.collisionGroupEnemies, this.collidePlatformPrey, null, this);
        this.physics.add.collider(this.platforms, this.collisionGroupThieves, this.collidePlatformEnemy, null, this);
        this.physics.add.collider(this.collisionGroupPlayers, this.collisionGroupEnemies, this.collidePlayerPrey, null, this);

        this.physics.add.overlap(this.huntBulletGroup, this.collisionGroupEnemies, this.overlapBulletPrey, null, this);
        this.physics.add.overlap(this.attackBulletGroup, this.collisionGroupThieves, this.overlapBulletThief, null, this);
        this.physics.add.overlap(this.collisionGroupWaterPump, this.collisionGroupEnemies, this.overlapWaterPump, null, this);
        this.physics.add.overlap(this.coinGroup, this.collisionGroupPlayers, this.overlapCoinPlayers, null, this);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        this.controlpad.action = ()=>{
            if (this.player.isStateEquals(States.HUNTING) || this.player.isStateEquals(States.SKY_ATTACK)) {
                this.player.fireBullet();
                this.fireBullet();
            }
        }
        this.controlpad.weaponSwap = ()=>{
            //Player swap animation
            this.swapPlayerMode();
        }
        this.updateRunner.add(this.controlpad);

        this.soundManager = new SoundManager(this);

        let ps = new PlayerSpawner(this);
        this.civSpawner = new CivilianSpawner(this);

        DomSceneControl.SetGameSceneControl(this);
        
        this.addBackground();
        
        this.player = ps.spawnPlayer();
        for (let i=0; i<3; i++)
            ps.spawnCollector();

        this.enemySpawner = new EnemySpawner(this);
        this.updateRunner.add(this.enemySpawner);

        for (let forest of this.levelData.FORESTS) {
            if (forest.hasEnemies()) {
                let birdSpawner = new BirdSpawner(this);
                birdSpawner.setX(forest.getCenterX());
                birdSpawner.setBirdType(forest.getEnemyType());
                this.updateRunner.add(birdSpawner);
            }
        }       
    }

    countFrozen(includeCarried = false) {
        let birds = this.collisionGroupEnemies.getChildren();
        let count = (birds.length > 0) ? birds.reduce((acc, sprite) => {
            if (sprite.parent.isStateEquals(States.FROZEN))
                acc ++;
            if (includeCarried && sprite.parent.isStateEquals(States.CARRIED))
                acc ++;
            return acc;
        }, 0) : 0;
        return count;
    }

    getClosestFrozen(source, states = [States.FROZEN]) {

        let frozen = this.collisionGroupEnemies.getChildren().filter(sprite => {
            for (let state of states)
                if (sprite.parent.isStateEquals(state)) return true;
            return false;
        });
        let target = this.physics.closest(source, frozen);

        return target;
    }

    swapPlayerMode() {

        let allModes = [States.PUSHING, States.HUNTING, States.SKY_ATTACK];
        let state = this.player.getState();
        let index = allModes.findIndex(mode => mode === state);

        let nextIndex = index === allModes.length - 1 ? 0 : index + 1;
        let nextState = allModes[nextIndex];

        this.player.setState(nextState);
        this.player.updateCollision();
        
        let name = this.getStateDisplayName(nextState);

        Dom.SetDomText(Consts.UI_WEAPON_TEXT, name);
        Dom.SetDomIdDisplay(Consts.UI_WEAPON_TEXT, true);
    }

    getStateDisplayName(state) {
        switch (state) {
            case States.HUNTING: return "Hunting";
            case States.SKY_ATTACK: return "Attacking";
            case States.PUSHING: return "Collecting";
            default: return "Idle";
        }
    }

    update(time, delta) {
        this.updateRunner.update(time, delta);
    }

    overlapBulletPrey(bullet, enemy) {
        if (enemy.parent.isStateEquals(States.NORMAL)) {
            bullet.setActive(false).setVisible(false).setPosition(0, 0);
            this.liveBirdGroup.remove(enemy);
            enemy.freeze();

            this.soundManager.play(Sfx.HIT_PREY);

            this.setPreyFrozenCollision(enemy);
            this.showPuff(enemy.x, enemy.y);
        }
    }

    overlapBulletThief(bullet, thiefSprite) {
        let thief = thiefSprite.parent;
        bullet.setActive(false).setVisible(false).setPosition(0, 0);
        thief.hit();
        this.showPuff(thief.x, thief.y);
    }

    overlapWaterPump(pump, preySprite) {
        
        let prey = preySprite.parent;
        pump.anims.play(Animations.WATER_PUMPING);

        if (!preySprite.parent.isStateEquals(States.DEAD)) {
            
            let value = prey.getValue();
            prey.die();
            this.collisionGroupEnemies.remove(preySprite);

            let tween = this.tweens.add({
                targets: preySprite,
                duration: 1000,
                x: {from: preySprite.x, to: pump.x},
                y: pump.getCenter().y,
                ease: Phaser.Math.Easing.Back.InOut,
                onComplete: ()=>{
                    prey.destroy();
                    this.addCoin(value);
                }
            });
        }
    }

    overlapCoinPlayers(coin, player) {

        //  Flash Player-
        //  Show collection effect - upwards white dots
        //  Collection sound

        coin.setVisible(false).setActive(false).setPosition(0, 0);

        GameSave.IncScore(coin.coinValue);
        Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
    }

    addCoin(value) {

        let pump = this.buildings.get(Buildings.WATER_PUMP);
        let sprite = this.coinGroup.get(pump.x, pump.getCenter().y);
        sprite.setDepth(Depths.ENEMIES_FROZEN).setVisible(true).setActive(true);
        SpritePhysics.AddPhysics(sprite);
        SpritePhysics.AddGroundDrag(sprite);

        this.showPuff(pump.x, pump.getCenter().y);

        let velX = Phaser.Math.Between(-96, 96);
        let velY = Phaser.Math.Between(-32, 0);
        sprite.body.setVelocity(velX, velY);

        sprite.coinValue = value;
    }

    collidePlatformEnemy(platform, sprite) {
        sprite.parent.die();
        sprite.setVisible(false).setActive(false);
        this.collisionGroupThieves.remove(sprite);
    }

    collidePlatformPrey(platform, preySprite) {
        let prey = preySprite.parent;
        if (prey.isStateEquals(States.CARRIED) || prey.isStateEquals(States.STOLEN)) {
            prey.setState(States.FROZEN);
            this.setPreyFrozenCollision(preySprite);
        }
    }

    collidePlayerPrey(player, prey) {
        (prey.parent.isStateEquals(States.FROZEN))
            prey.setY(WorldConsts.GROUND_Y - prey.height * .7);
    }

    showPuff(x, y) {
        let puff = this.puffGroup.get(x, y);
        puff.setDepth(Depths.FREEZE_FX).setScale(1.5);
        puff.anims.play(Animations.FX_PUFF)
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

    addThiefToGroups(sprite) {
        this.collisionGroupThieves.add(sprite);
        this.spriteUpdateGroup.add(sprite);
    }

    addCoinerToGroups(sprite) {
        this.collisionGroupCoiners.add(sprite);
        this.spriteUpdateGroup.add(sprite);
    }
    
    addFlightPhysics(sprite) {
        SpritePhysics.AddFlightPhysics(sprite);
        this.setPreyFlyingcollision(sprite);
    }

    addBoundlessFlightPhysics(sprite) {
        SpritePhysics.AddFlightPhysicsNoBounds(sprite);
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

        let mode = this.player.getState();
        let isHunting = (mode === States.HUNTING);
        let group = (isHunting) ? this.huntBulletGroup : this.attackBulletGroup;
        let target = (isHunting) ? this.getClosestBirdTarget(this.player) : this.getClosestThiefTarget(this.player);

        let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, target.x, target.y);
        let bullet = group.get(this.player.x, this.player.y);

        if (bullet)
            if (isHunting)
                bullet.setHuntBullet(angle)
            else
                bullet.setAttackBullet(angle);
    }

    getClosestBirdTarget(player) {

        let maxDist = WorldConsts.WIDTH * .5;
        let target = this.physics.closest(player, this.liveBirdGroup.getChildren());
        if (target && Math.abs(target.x - player.x) < maxDist)
            return target;

        return new Phaser.Geom.Point(this.player.x, this.player.y - 32);
    }

    getClosestThiefTarget(player) {

        let all = this.collisionGroupThieves.getChildren();
        let closest = this.physics.closest(player, all);
        let maxDist = WorldConsts.WIDTH * .5;
        if (closest && Math.abs(closest.x - player.x) < maxDist)
            return closest;

        return new Phaser.Geom.Point(this.player.x, this.player.y - 32);
    }

    getClosestCoin(coiner) {
        let active = this.coinGroup.getMatching('active', true);
        return this.physics.closest(coiner, active);
    }

    getLiveBirdsCount() {
        return this.collisionGroupEnemies.countActive();
    }

    getThiefCount() {
        return this.collisionGroupThieves.countActive();
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

    setPreyStolenCollisions(sprite) {
        this.setPreyCarriedCollisions(sprite);
        sprite.setCollideWorldBounds(false);
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

    getLevelWidth() {
        return this.levelData.LENGTHS * WorldConsts.WIDTH;
    }
}
export default Game;