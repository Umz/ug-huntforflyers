import BackgroundBuilder from "background/BackgroundBuilder";
import BGAnimations from "background/BGAnimations";
import Bullet from "classes/Bullet";
import Coin from "classes/Coin";
import Icon from "classes/Icon";
import Rocket from "classes/Rocket";
import Controlpad from "components/Controlpad";
import Dom from "components/Dom";
import DomSceneControl from "components/DomSceneControl";
import Counter from "components/Counter";
import GameSave from "components/GameSave";
import UpdateRunner from "components/UpdateRunner";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import SoundManager from "components/SoundManager";
import WorldConsts from "consts/WorldConsts";
import Consts from "consts/Consts";
import States from "consts/States";
import LevelMapper from "mappers/LevelMapper";
import PreySpawner from "spawner/PreySpawner";
import Depths from "consts/Depths";
import Buildings from "consts/Buildings";
import Sfx from "consts/Sfx";
import Animations from "consts/Animations";
import PlayerSpawner from "spawner/PlayerSpawner";
import CivilianSpawner from "spawner/CivilianSpawner";
import EnemySpawner from "spawner/EnemySpawner";
import Dialogue from "../consts/Dialogue";

class Game extends Phaser.Scene {

    constructor() {
        super(Consts.GAME_SCENE);
    }

    create(data) {

        const CURRENT_STAGE = GameSave.GetStage();
        Dom.SetDomText(Consts.HUD_STAGE_TEXT, CURRENT_STAGE);
        DomSceneControl.SetGameSceneControl(this);

        this.levelData = LevelMapper.GetLevelData(CURRENT_STAGE);
        this.buildings = new Map();
        this.updateRunner = new UpdateRunner();
        
        const LEVEL_WIDTH = this.levelData.LENGTHS * WorldConsts.WIDTH;
        this.physics.world.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);
        this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);

        SpriteBuilder.scene = this;
        BackgroundBuilder.scene = this;

        this.platforms = this.physics.add.group({ immovable: true });
        this.liveBirdGroup = this.add.group();
        this.liveSkyEnemies = this.add.group();
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

        this.rocketGroup = this.physics.add.group({
            classType: Rocket,
            defaultKey: 'background',
            defaultFrame: 'rocket'
        });

        this.coinGroup = this.physics.add.group({
            classType: Coin,
            defaultKey: 'background',
            defaultFrame: 'coin'
        });

        this.iconGroup = this.add.group({
            classType: Icon,
            defaultKey: 'background',
            defaultFrame: 'coin',
            runChildUpdate: true
        });
        
        this.collisionGroupPlayers = this.physics.add.group();
        this.collisionGroupPrey = this.physics.add.group();
        this.collisionGroupThieves = this.physics.add.group();
        this.collisionGroupCoiners = this.physics.add.group();
        this.collisionGroupSkyBombers = this.physics.add.group();
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
        this.physics.add.collider(this.platforms, this.collisionGroupSkyBombers, this.collidePlatformEnemy, null, this);
        this.physics.add.collider(this.platforms, this.rocketGroup, this.collidePlatformRocket, null, this);
        this.physics.add.collider(this.collisionGroupPlayers, this.collisionGroupPrey, this.collidePlayerPrey, null, this);

        this.physics.add.overlap(this.huntBulletGroup, this.collisionGroupPrey, this.overlapBulletPrey, null, this);
        this.physics.add.overlap(this.attackBulletGroup, this.collisionGroupThieves, this.overlapBulletThief, null, this);
        this.physics.add.overlap(this.attackBulletGroup, this.collisionGroupSkyBombers, this.overlapBulletThief, null, this);
        this.physics.add.overlap(this.collisionGroupCoiners, this.collisionGroupPlayers, this.overlapCoinerPlayers, null, this);
        this.physics.add.overlap(this.collisionGroupWaterPump, this.collisionGroupPrey, this.overlapWaterPump, null, this);
        this.physics.add.overlap(this.coinGroup, this.collisionGroupPlayers, this.overlapCoinPlayers, null, this);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        this.updateRunner.add(this.controlpad);

        this.controlpad.action = ()=>{
            if (this.player.canFire()) {
                this.player.fireBullet();
                this.fireBullet();
            }
        }
        this.controlpad.weaponSwap = ()=>{
            this.swapPlayerMode();
            this.soundManager.play(Sfx.WEAPON_SELECT);
        }

        this.soundManager = new SoundManager(this);
        this.playerSpawner = new PlayerSpawner(this);
        this.civSpawner = new CivilianSpawner(this);

        this.player = this.playerSpawner.spawnPlayer();
        let cks = this.levelData.CARRYKINS;
        for (let i=0; i<cks; i++)
            this.playerSpawner.spawnCollector();
        
        let enemies = this.levelData.ENEMIES;
        this.enemySpawner = new EnemySpawner(this, enemies);
        this.updateRunner.add(this.enemySpawner);
        
        this.addBackground();
        for (let forest of this.levelData.FORESTS) {
            if (forest.hasEnemies()) {
                let birdSpawner = new PreySpawner(this);
                birdSpawner.setX(forest.getCenterX());
                birdSpawner.setBirdType(forest.getEnemyType());
                this.updateRunner.add(birdSpawner);
            }
        }

        //  #   REFACTOR

        this.levelComplete = false;
        this.counter = Counter.New().setRepeating(true).setMaxCount(3000);

        let TutClass = this.levelData.TUTORIAL;
        if (TutClass)
            this.updateRunner.add(new TutClass(this));

        /*
        this.soundManager.play(Sfx.BGM_LEVEL);
        this.events.on('shutdown', ()=>{
            this.soundManager.destroyMusic();
        }, this);
        */
    }

    update(time, delta) {
        this.updateRunner.update(time, delta);

        this.counter.update(time, delta);
        if (this.counter.isComplete()) {
            if (this.isAllHousesComplete()) {
                let house = this.buildings.get(Buildings.PLAYER_HOUSE);
                this.showIcon(house, -1, 'puff1');
                addChatMessage('Professor', Dialogue.LEVEL_COMPLETE, Dialogue.TYPE_PLAYER);
                this.soundManager.play(Sfx.LEVEL_COMPLETE);
                this.counter.setActive(false);
            }
        }

        let count = this.collisionGroupCollectors.countActive();
        Dom.SetDomText(Consts.HUD_CARRYKINS_TEXT, count);
    }

    overlapBulletPrey(bullet, prey) {

        if (prey.isState(States.NORMAL)) {

            bullet.setActive(false).setVisible(false).setPosition(0, 0);

            this.liveBirdGroup.remove(prey);
            prey.freeze();

            this.soundManager.play(Sfx.HIT_PREY);
            this.showPuff(prey.x, prey.y);
        }
    }

    overlapBulletThief(bullet, thief) {
        bullet.setActive(false).setVisible(false).setPosition(0, 0);
        thief.hit();

        let sound = thief.isDead() ? Sfx.HIT_CANNON : Sfx.HIT_CANNON_NOKILL;
        this.soundManager.play(sound);
        this.showPuff(thief.x, thief.y);
    }

    overlapWaterPump(pump, prey) {
        
        pump.anims.play(Animations.WATER_PUMPING);

        if (!prey.isState(States.DEAD)) {
            
            let value = prey.getValue();
            prey.setActive(false);
            prey.setState(States.DEAD);
            this.collisionGroupPrey.remove(prey);

            this.soundManager.playLimited(Sfx.ABSORB_PREY);

            let tween = this.tweens.add({
                targets: prey,
                duration: 1000,
                x: {from: prey.x, to: pump.x},
                y: pump.getCenter().y,
                ease: Phaser.Math.Easing.Back.InOut,
                onComplete: ()=>{
                    prey.kill();
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

        if (player.isState(States.MODE_TANK)) {
            coin.setVisible(false).setActive(false).setPosition(0, WorldConsts.HEIGHT);
    
            GameSave.IncScore(coin.coinValue);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());

            this.soundManager.playLimited(Sfx.PICKUP);
        }
    }

    overlapCoinerPlayers(coiner, player) {
        if (player.isState(States.MODE_TANK)) {
            this.collisionGroupCoiners.remove(coiner);
            coiner.kill();
            coiner.destroy();
            this.soundManager.play(Sfx.HIT_COINER);
        }
    }

    collidePlatformEnemy(platform, thief) {
        this.collisionGroupThieves.remove(thief);
        thief.kill();
        thief.destroy();

        this.soundManager.play(Sfx.HIT_CANNON);
    }

    collidePlatformRocket(platform, rocket) {

        let players = this.collisionGroupPlayers.getChildren();
        // carryKins - paleKins - civilians?
        //  GET any nearby players and hit 
        if (rocket.active)
            for (let player of players)
                if (Math.abs(rocket.x - player.x) < WorldConsts.WIDTH * .1)
                    player.hit();
        
        rocket.setVisible(false).setActive(false).setPosition(0, WorldConsts.HEIGHT);
        this.soundManager.play(Sfx.MISSLE_BLAST);
    }

    collidePlatformPrey(platform, prey) {
        if (prey.isState(States.CARRIED) || prey.isState(States.STOLEN)) {
            prey.setState(States.FROZEN);
            prey.setFrozenCollision();
        }
    }

    collidePlayerPrey(player, prey) {
        (prey.isState(States.FROZEN))
            prey.setY(WorldConsts.GROUND_Y - prey.height * .7);
    }

    swapPlayerMode() {
        
        let modes = [
            {state: States.MODE_HUNT, hud:Consts.HUD_WEP_HUNTING},
            {state: States.MODE_CANNON, hud:Consts.HUD_WEP_ATTACK},
            {state: States.MODE_TANK, hud:Consts.HUD_WEP_COLLECT}
        ];

        this.player.nextState();
        this.player.updateCollision();
        this.player.updateAnimation();

        let state = this.player.getState();
        let current = modes.find(m => m.state === state);
        let displayName = this.player.getStateName(current.state);
        
        Dom.SetDomText(Consts.HUD_WEAPON_TEXT, displayName);
        Dom.SetDomIdVisibility(Consts.HUD_WEAPON_TEXT, true);
        Dom.SetActiveInGroup(Consts.HUD_WEAPON_SELECT, Consts.HUD_WEAPON_ACTIVE, current.hud);
    }

    showPuff(x, y) {
        let puff = this.puffGroup.get(x, y);
        puff.setDepth(Depths.FREEZE_FX).setScale(1.5);
        puff.anims.play(Animations.FX_PUFF)
    }

    showIcon(sprite, millis, frame) {
        let active = this.iconGroup.getMatching('target', sprite);
        let icon = active.shift() || this.iconGroup.get(sprite.x, sprite.y);
        icon.setFrame(frame).showAboveTarget(sprite, millis);
        let tween = this.tweens.add({
            targets: icon,
            duration: 1000,
            scaleY: {from:0, to:1},
            ease: Phaser.Math.Easing.Back.Out
        });
    }

    addCoin(value) {

        let pump = this.buildings.get(Buildings.WATER_PUMP);

        let sprite = this.coinGroup.get(pump.x, pump.getCenter().y);
        sprite.reset(value);
        sprite.initVelocity();

        SpritePhysics.AddPhysics(sprite);
        SpritePhysics.AddGroundDrag(sprite);

        this.soundManager.playLimited(Sfx.CONVERT_PREY_TO_COIN);
        this.showPuff(pump.x, pump.getCenter().y);
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
                this.soundManager.play(Sfx.COINER_DROP_COIN);
            }
        });
    }

    addRocketToScene() {
        let rocket = this.rocketGroup.get(-10, -10);
        rocket.reset();

        return rocket;
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
        let isHunting = (mode === States.MODE_HUNT);
        let group = (isHunting) ? this.huntBulletGroup : this.attackBulletGroup;
        let target = (isHunting) ? this.getClosestBirdTarget(this.player) : this.getClosestThiefTarget(this.player);

        let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, target.x, target.y);
        let bullet = group.get(this.player.x, this.player.y);

        if (bullet)
            if (isHunting) {
                bullet.setHuntBullet(angle)
                this.soundManager.play(Sfx.FIRE_HUNT);
            }
            else {
                bullet.setAttackBullet(angle);
                this.soundManager.play(Sfx.FIRE_CANNON);
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

    getClosestBirdTarget(player) {

        let maxDist = WorldConsts.WIDTH * .5;
        let target = this.physics.closest(player, this.liveBirdGroup.getChildren());
        if (target && Math.abs(target.x - player.x) < maxDist)
            return target;

        return new Phaser.Geom.Point(this.player.x, this.player.y - 32);
    }

    getClosestThiefTarget(player) {

        let all = this.liveSkyEnemies.getChildren();
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

    getGroupActiveCount(group) {
        return group.countActive();
    }

    addBackground() {

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);

        let mapTypes = [Buildings.WATER_PUMP, Buildings.LAB_tABLE, Buildings.PLAYER_HOUSE];
        let houseTypes = [Buildings.TENT1, Buildings.TENT2, Buildings.TENT3, Buildings.HUT, Buildings.HOUSE1];

        for (let building of this.levelData.BUILDINGS) {

            let house = BackgroundBuilder.getHouse(this, building);
            this.add.existing(house);

            if (mapTypes.find(type => type === building.type))
                this.buildings.set(building.type, house);
            
            if (houseTypes.find(type => type === building.type)) {

                let scaffold = BackgroundBuilder.addScaffolding(house);
                house.setScaffold(scaffold);
                house.setCompletePercentAndCrop(building.complete);
                
                this.civSpawner.spawnCivilian(house); 
            }
        }

        this.addBuldingCollisions();

        for (let forest of this.levelData.FORESTS)
            BackgroundBuilder.addForest(this, forest);
            
        //  ADD the ground - physics
        let levelWidth = this.levelData.LENGTHS * WorldConsts.WIDTH;
        let ground = this.add.rectangle(0, WorldConsts.GROUND_Y - 1, levelWidth, 10, 0x000000).setOrigin(0).setVisible(false);
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

    isAllHousesComplete() {
        let civs = this.collisionGroupCivilians.getChildren();
        for (let c of civs)
            if (!c.isHomeComplete())
                return false;
        return true;
    }

    getLevelWidth() {
        return this.levelData.LENGTHS * WorldConsts.WIDTH;
    }
}
export default Game;