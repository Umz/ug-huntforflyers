import Controlpad from "components/Controlpad";
import Bullet from "classes/Bullet";
import WorldConsts from "consts/WorldConsts";
import BackgroundBuilder from "background/BackgroundBuilder";
import Dom from "components/Dom";
import Consts from "consts/Consts";
import States from "consts/States";
import GameSave from "components/GameSave";
import LevelMapper from "mappers/LevelMapper";
import PreySpawner from "spawner/PreySpawner";
import UpdateRunner from "components/UpdateRunner";
import Depths from "consts/Depths";
import Buildings from "consts/Buildings";
import Animations from "consts/Animations";
import BGAnimations from "background/BGAnimations";
import DomSceneControl from "components/DomSceneControl";
import SpriteBuilder from "components/SpriteBuilder";
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

        SpriteBuilder.scene = this;

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
        this.collisionGroupPrey = this.physics.add.group();
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
        
        this.physics.add.collider(this.platforms, this.collisionGroupPrey, this.collidePlatformPrey, null, this);
        this.physics.add.collider(this.platforms, this.collisionGroupThieves, this.collidePlatformEnemy, null, this);
        this.physics.add.collider(this.collisionGroupPlayers, this.collisionGroupPrey, this.collidePlayerPrey, null, this);

        this.physics.add.overlap(this.huntBulletGroup, this.collisionGroupPrey, this.overlapBulletPrey, null, this);
        this.physics.add.overlap(this.attackBulletGroup, this.collisionGroupThieves, this.overlapBulletThief, null, this);
        this.physics.add.overlap(this.collisionGroupCoiners, this.collisionGroupPlayers, this.overlapCoinerPlayers, null, this);
        this.physics.add.overlap(this.collisionGroupWaterPump, this.collisionGroupPrey, this.overlapWaterPump, null, this);
        this.physics.add.overlap(this.coinGroup, this.collisionGroupPlayers, this.overlapCoinPlayers, null, this);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        this.controlpad.action = ()=>{
            if (this.player.isState(States.HUNTING) || this.player.isState(States.SKY_ATTACK)) {
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
        for (let i=0; i<1; i++)
            ps.spawnCollector();

        this.enemySpawner = new EnemySpawner(this);
        this.updateRunner.add(this.enemySpawner);

        for (let forest of this.levelData.FORESTS) {
            if (forest.hasEnemies()) {
                let birdSpawner = new PreySpawner(this);
                birdSpawner.setX(forest.getCenterX());
                birdSpawner.setBirdType(forest.getEnemyType());
                this.updateRunner.add(birdSpawner);
            }
        }
    }

    countFrozen(includeCarried = false) {
        let birds = this.collisionGroupPrey.getChildren();
        let count = (birds.length > 0) ? birds.reduce((acc, sprite) => {
            if (sprite.isState(States.FROZEN))
                acc ++;
            if (includeCarried && sprite.isState(States.CARRIED))
                acc ++;
            return acc;
        }, 0) : 0;
        return count;
    }

    getClosestFrozen(source, states = [States.FROZEN]) {

        let frozen = this.collisionGroupPrey.getChildren().filter(sprite => {
            for (let state of states)
                if (sprite.isState(state)) return true;
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

        if (enemy.isState(States.NORMAL)) {

            bullet.setActive(false).setVisible(false).setPosition(0, 0);

            this.liveBirdGroup.remove(enemy);
            enemy.freeze();

            this.soundManager.play(Sfx.HIT_PREY);
            this.showPuff(enemy.x, enemy.y);
        }
    }

    overlapBulletThief(bullet, thief) {
        bullet.setActive(false).setVisible(false).setPosition(0, 0);
        thief.hit();
        this.showPuff(thief.x, thief.y);
    }

    overlapWaterPump(pump, prey) {
        
        pump.anims.play(Animations.WATER_PUMPING);

        if (!prey.isState(States.DEAD)) {
            
            let value = prey.getValue();
            prey.kill();
            this.collisionGroupPrey.remove(prey);

            let tween = this.tweens.add({
                targets: prey,
                duration: 1000,
                x: {from: prey.x, to: pump.x},
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

        if (player.isState(States.PUSHING)) {
            coin.setVisible(false).setActive(false).setPosition(0, 0);
    
            GameSave.IncScore(coin.coinValue);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
        }
    }

    overlapCoinerPlayers(coiner, player) {
        if (player.isState(States.PUSHING)) {
            this.collisionGroupCoiners.remove(coiner);
            coiner.kill();
            coiner.destroy();
        }
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
        sprite.claimed = false;
    }

    dropCoin(coin, x) {
        let tween = this.tweens.add({
            targets: coin,
            duration: 500,
            x: {from:x, to:x},
            y: WorldConsts.GROUND_Y + 16,
            ease: Phaser.Math.Easing.Back.InOut,
            onComplete: ()=>{
                coin.setVisible(false).setActive(false);
            }
        });
    }

    collidePlatformEnemy(platform, thief) {
        this.collisionGroupThieves.remove(thief);
        thief.kill();
        thief.destroy();
    }

    collidePlatformPrey(platform, prey) {
        if (prey.isState(States.CARRIED) || prey.isState(States.STOLEN)) {
            prey.setState(States.FROZEN);
            prey.setPreyFrozenCollision();
        }
    }

    collidePlayerPrey(player, prey) {
        (prey.isState(States.FROZEN))
            prey.setY(WorldConsts.GROUND_Y - prey.height * .7);
    }

    showPuff(x, y) {
        let puff = this.puffGroup.get(x, y);
        puff.setDepth(Depths.FREEZE_FX).setScale(1.5);
        puff.anims.play(Animations.FX_PUFF)
    }

    addSpriteToSceneAndGroups(sprite, ...groups) {

        this.add.existing(sprite);

        for (let group of groups) {
            group.add(sprite);
        }
    }

    addPlayerControls(player) {
        this.controlpad.addControlTarget(player.controller);
        this.cameras.main.startFollow(player);
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
        let active = this.coinGroup.getChildren().filter(sprite => !sprite.claimed && sprite.active);
        return this.physics.closest(coiner, active);
    }

    getLiveBirdsCount() {
        return this.collisionGroupPrey.countActive();
    }

    getThiefCount() {
        return this.collisionGroupThieves.countActive();
    }

    getCoinerCount() {
        return this.collisionGroupCoiners.countActive();
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