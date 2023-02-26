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
import Decor from "consts/Decor";
import Sfx from "consts/Sfx";
import Animations from "consts/Animations";
import PlayerSpawner from "spawner/PlayerSpawner";
import CivilianSpawner from "spawner/CivilianSpawner";
import EnemySpawner from "spawner/EnemySpawner";
import Dialogue from "../consts/Dialogue";
import Textures from "../consts/Textures";
import Gravestone from "../classes/Gravestone";
import Interaction from "../components/Interaction";
import Interactions from "../consts/Interactions";

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

        this.saveData = GameSave.GetSaveData();

        this.saveData.stage = CURRENT_STAGE;
        this.isGraveShowing = false;
        
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

        this.windTrees = this.add.group();
        this.talkingGroup = this.add.group();

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
        this.sparkGroup = this.add.group({
            defaultKey: 'background',
            defaultFrame: 'fx_spark1',
            runChildUpdate: true
        });
        this.collectGroup = this.add.group({
            defaultKey: Textures.WHITE_SQUARE
        });
        this.skyExplodeGroup = this.add.group({
            defaultKey: 'background',
            defaultFrame: 'skyExplosion1',
            runChildUpdate: true
        });
        this.groundExplodeGroup = this.add.group({
            defaultKey: 'background',
            defaultFrame: 'groundExplode0',
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
        this.collisionGroupClones = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.collisionGroupPlayers);
        this.physics.add.collider(this.platforms, this.collisionGroupCollectors);
        this.physics.add.collider(this.platforms, this.collisionGroupCivilians);
        this.physics.add.collider(this.platforms, this.collisionGroupClones);
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
        this.physics.add.overlap(this.collisionGroupPlayers, this.talkingGroup, this.overlapPlayerInteractive, null, this);

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
        this.controlpad.interact = ()=>{
            this.player.setListeningForInteraction(true);
            this.showIcon(this.player, -1, 'ic_speech');
        }

        this.soundManager = new SoundManager(this);
        this.playerSpawner = new PlayerSpawner(this);
        this.civSpawner = new CivilianSpawner(this);

        this.player = this.playerSpawner.spawnPlayer();
        
        this.playerSpawner.spawnCollectors(this.levelData.CARRYKINS);
        this.playerSpawner.spawnClones(3);
        this.playerSpawner.spawnPaleKins(1);
        
        let enemies = this.levelData.ENEMIES;
        this.enemySpawner = new EnemySpawner(this, enemies);
        this.updateRunner.add(this.enemySpawner);
        
        this.addBackground();

        let forestWithPrey = this.levelData.FORESTS.filter(forest => forest.hasPrey());
        for (let forest of forestWithPrey) {
            let preySpawner = new PreySpawner(this);
            preySpawner.setX(forest.getCenterX());
            preySpawner.setBirdType(forest.getEnemyType());
            preySpawner.multiplyDownTime(forestWithPrey.length);
            this.updateRunner.add(preySpawner);
        }

        //  #   REFACTOR

        this.levelComplete = false;
        this.counter = Counter.New().setRepeating(true).setMaxCount(3000);

        let TutClass = this.levelData.TUTORIAL;
        if (TutClass)
            this.updateRunner.add(new TutClass(this));

        CreateSparkleEmitter: {
            let particle = this.add.particles('background', 'fx_sparkle');
            particle.depth = Depths.ENEMIES + 1;

            let emitter = particle.createEmitter({
                speedX: { min: -4, max: 4 },
                speedY: { min: -2, max: -8 },
                alpha: { start: 1, end: 0 },
                lifespan: 1500,
                frequency: -1
            });
            emitter.stop();
            this.fxEmitter = emitter;
        }

        CreatePuffEmitter: {
            let particle = this.add.particles('background', 'puff2');
            particle.depth = Depths.ENEMIES + 1;

            let emitter = particle.createEmitter({
                tint: 0x333333,
                speedX: { min: -24, max: 24 },
                speedY: { min: -2, max: -40 },
                alpha: { start: 1, end: 0 },
                scaleX: {start: .2, end: 2 },
                scaleY: {start: .2, end: 2 },
                lifespan: 500,
                frequency: -1
            });
            emitter.stop();
            this.smokeEmitter = emitter;
        }

        CreateDerbisEmitter: {

            let box = new Phaser.Geom.Rectangle(0, 0, 16, 2);
            let particle = this.add.particles('background', 'bullet');
            particle.depth = Depths.ENEMIES + 1;

            let emitter = particle.createEmitter({
                speedX: { min: -23, max: 23 },
                speedY: { min: -64, max: -80 },
                alpha: { start: 1, end: .2 },
                scaleX: {start: 1.5, end: .5 },
                scaleY: {start: 1.5, end: .5 },
                rotate: {start: 0, end: 90, random: true},
                gravityY: 120,
                emitZone: { type: 'random', source: box },
                
                lifespan: 1000,
                frequency: -1
            });
            emitter.stop();
            this.debrisEmitter = emitter;
        }

        CreateLeafEmitter: {

            let box = new Phaser.Geom.Rectangle(0, 0, 24, 20);
            let particle = this.add.particles('background', 'leaf_green');
            particle.depth = Depths.FOREST_FG2;

            let emitter = particle.createEmitter({
                frame: { frames: [ 'leaf_red', 'leaf_green', 'leaf_yellow', 'leaf_brown' ] },
                speedX: { min: -24, max: -40 },
                speedY: { min: -8, max: 8 },
                scaleX: {start: 1, end: 0 },
                scaleY: {start: 1, end: 0 },
                alpha: { start: 1, end: 0 },
                rotate: { start: 0, end: 360, rotate: true },
                lifespan: 2500,
                emitZone: { type: 'random', source: box },
                frequency: -1
            });
            emitter.stop();
            this.leafEmitter = emitter;
        }

        CreateWindEmitter: {

            let particle = this.add.particles(Textures.WIND_CIRCLE);
            particle.depth = Depths.WIND_FX;

            let emitter = particle.createEmitter({
                scaleX: {start: 1, end: 0 },
                scaleY: {start: 1, end: 0 },
                alpha: { start: .5, end: 0 },
                lifespan: 1500,
                frequency: 50
            });
            emitter.stop();
            this.windEmitter = emitter;
        }

        /*
        this.soundManager.play(Sfx.BGM_LEVEL);
        this.events.on('shutdown', ()=>{
            this.soundManager.destroyMusic();
        }, this);
        */

        this.showWind();
        this.windCounter = Counter.New().setRepeating(true).setMaxCount(61000);

        this.addWindParticle();

        this.loadGraveStones();
    }

    update(time, delta) {
        this.updateRunner.update(time, delta);

        if (this.windCounter.updateAndCheck(time, delta))
            this.showWind();

        this.counter.update(time, delta);
        if (this.counter.isComplete()) {
            if (this.isAllHousesComplete()) {
                let house = this.buildings.get(Buildings.PLAYER_HOUSE);
                this.showIcon(house, -1, 'puff1');
                Dom.AddChatMessage('Professor', Dialogue.LEVEL_COMPLETE, Dialogue.TYPE_PLAYER);
                this.soundManager.play(Sfx.LEVEL_COMPLETE);
                this.counter.setActive(false);
            }

            this.showWindParticle();
        }

        let count = this.collisionGroupCollectors.countActive();
        Dom.SetDomText(Consts.HUD_CARRYKINS_TEXT, count);

        this.saveData.addPlayTime(delta);
    }

    addWindParticle() {

        let windSpeed = WorldConsts.WIDTH / 15;

        let windParticle = this.physics.add.sprite(0, -100, Textures.WIND_CIRCLE).setDepth(Depths.WIND_FX);
        windParticle.setVelocityX(-windSpeed).setAlpha(.5);
        windParticle.setMaxVelocity(windSpeed);
        
        this.wp = windParticle;
        this.wp.speed = -windSpeed;

        this.windEmitter.startFollow(windParticle);
        this.windEmitter.start();
    }

    showWindParticle(x, y) {
        
        let point = this.physics.world.bounds.getRandomPoint();
        this.wp.setPosition(point.x, point.y);
        let mul = Math.random() > .5 ? 1 : -1;
        this.wp.setVelocityY((this.wp.speed * .1) * mul);
    }

    showWind() {
        
        let windSpeed = WorldConsts.WIDTH / 15;
        let windX = this.getLevelWidth();

        let allTrees = Phaser.Utils.Array.StableSort(this.windTrees.getChildren(), (a, b) => b.x - a.x );;
        let treeIndex = 0;
        let treeTotal = allTrees.length;

        let treeShake = (tree)=>{
            let pos = tree.getTopLeft();
            this.leafEmitter.explode(6, pos.x, pos.y);

            let tween = this.tweens.add({
                targets: tree,
                duration: 500,
                x: {from: tree.x, to: tree.x + Phaser.Math.Between(-6, 6)},
                scaleX: {from:1, to:1.1},
                scaleY: {from:1, to:1.1},
                ease: Phaser.Math.Easing.Cubic.InOut,
                yoyo: true
            });
        }

        let windToNextTree = ()=>{            
            
            let tree = allTrees[treeIndex];
            let timeToTree = (windX - tree.x) / windSpeed * 1000;  // Distance / Speed = Time
            
            this.time.addEvent({
                delay: timeToTree,
                callback: ()=>{
                    treeShake(tree);
                    
                    windX = tree.x;
                    treeIndex ++;

                    if (treeIndex < treeTotal)
                        windToNextTree();
                }
            });
        }

        windToNextTree();
    }

    overlapPlayerInteractive(interactive, player) {
        
        if (player.isListeningForInteraction()) {

            player.setListeningForInteraction(false);
            player.setVelocityX(0);
            player.showingIcon = false;

            interactive.interact();
            if (interactive.interactIcon)
                this.showIcon(interactive, 3000, interactive.interactIcon);

            if (interactive.interactRemove)
                this.talkingGroup.remove(interactive);
        }

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
        if (thief.isDead()) {
            this.smokeEmitter.explode(8, thief.x, thief.y);
            this.showSkyExplosion(thief.x, thief.y);

            this.saveData.addKills(1);
        }
        else
            this.showSpark(thief.x, thief.y);
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
                    this.saveData.addMaterials(1);
                }
            });
        }
    }

    overlapCoinPlayers(coin, player) {

        if (player.isState(States.MODE_TANK)) {
            
            this.saveData.addCollected(coin.coinValue);

            GameSave.IncScore(coin.coinValue);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
            
            this.soundManager.playLimited(Sfx.PICKUP);
            this.showCollect(coin.x);

            coin.setVisible(false).setActive(false).setPosition(0, WorldConsts.HEIGHT);
        }
    }

    overlapCoinerPlayers(coiner, player) {
        if (player.isState(States.MODE_TANK)) {
            
            this.soundManager.play(Sfx.HIT_COINER);
            this.debrisEmitter.explode(30, coiner.x, coiner.y);

            this.collisionGroupCoiners.remove(coiner);
            coiner.kill();
            coiner.destroy();

            this.saveData.addKills(1);
        }
    }

    collidePlatformEnemy(platform, thief) {

        this.collisionGroupThieves.remove(thief);
        thief.kill();
        thief.destroy();

        this.bombExplodeOnGround(thief.x);

        this.soundManager.play(Sfx.HIT_CANNON);
    }

    collidePlatformRocket(platform, rocket) {

        if (rocket.active)
            this.bombExplodeOnGround(rocket.x);
        
        rocket.setVisible(false).setActive(false).setPosition(0, WorldConsts.HEIGHT);
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

    playerDie() {

        let home = this.getBuilding(Buildings.PLAYER_HOUSE);
        let camera = this.cameras.main;
        camera.stopFollow();

        this.controlpad.setActive(false);

        let grave = this.saveAndAddGravestone();
        this.showGravestoneStats(grave);

        this.player.setDepth(Depths.BUILDINGS_BG - 1).setPosition(home.worldX, WorldConsts.GROUND_Y - 16);
        this.player.setVelocity(0).setAcceleration(0);
    }

    playerRespawn() {

        Dom.SetDomIdDisplay('grave-stats-container', false);
        this.swapPlayerMode(States.MODE_HUNT);

        let camera = this.cameras.main;
        camera.pan(this.player.x, camera.y, 2000, Phaser.Math.Easing.Back.Out, false, (camera, progress)=>{
            if (progress >= 1) {
                this.player.respawn();
                camera.startFollow(this.player);
                Dom.AddChatMessage(this.saveData.playerName, "Ready to go!", 'speech-main');
                Dom.SetDomText(Consts.HUD_PLAYER_NAME, this.saveData.playerName);
            }
        });
    }

    saveAndAddGravestone() {

        let playerBuilding = this.getPlayerBuilding();
        let offset = this.player.x - playerBuilding.worldX;

        let graveData = this.saveData.getTrackDataForGrave(offset);
        this.saveData.addGraveData(graveData);

        this.saveData.resetTrackData();
        this.saveData.updatePlayerData();

        GameSave.SaveDataToLocal(this.saveData);

        let grave = new Gravestone(this, this.player.x, WorldConsts.GROUND_Y + 1, 'background', 'gravestone');
        grave.setStats(graveData);
        this.add.existing(grave);

        Interaction.AddInteraction(grave, Interactions.GRAVE, grave.getStats());
        this.talkingGroup.add(grave);
        this.physics.add.existing(grave);

        return grave;
    }

    showGravestoneStats(grave) {

        let data = grave.getStats();
        setGraveHTML(data);
        Dom.SetDomIdDisplay('grave-stats-container', true);
        
        let camera = this.cameras.main;
        
        let element = Dom.GetDomElementById('grave-stats');
        let statBoxWidth = element.offsetWidth;
        
        let ratio = innerWidth / camera.width;
        let graveRelativeX = grave.x - camera.scrollX;
        let calcLeft = graveRelativeX * ratio - statBoxWidth * .5;
        let styleLeft = Math.round(calcLeft);
        
        Dom.ShowGraveStats(styleLeft, data);
    }

    addGravestone(data) {

        let baseX = this.getPlayerBuilding().worldX;
        let graveX = baseX + data.offsetX;

        let grave = new Gravestone(this, graveX, WorldConsts.GROUND_Y + 1, 'background', 'gravestone');
        grave.setStats(data);
        this.add.existing(grave);
        this.physics.add.existing(grave);

        Interaction.AddInteraction(grave, Interactions.GRAVE, grave.getStats());
        this.talkingGroup.add(grave);
    }

    loadGraveStones() {

        let savedGraves = this.saveData.graves;
        for (let grave of savedGraves)
            this.addGravestone(grave);
    }

    closeMenu() {
        if (this.player.isDead())
            this.playerRespawn();
        else {
            Dom.SetDomIdDisplay('grave-stats-container', false);
            this.controlpad.setActive(true);
        }
    }

    swapPlayerMode(mode) {
        
        let modes = [
            {state: States.MODE_HUNT, hud:Consts.HUD_WEP_HUNTING},
            {state: States.MODE_CANNON, hud:Consts.HUD_WEP_ATTACK},
            {state: States.MODE_TANK, hud:Consts.HUD_WEP_COLLECT}
        ];

        if (mode)
            this.player.setState(mode);
        else
            this.player.nextState();

        this.player.updateCollision();
        this.player.updateAnimation();

        let state = mode || this.player.getState();
        let current = modes.find(m => m.state === state);
        let displayName = this.player.getStateName(current.state);
        
        Dom.SetDomText(Consts.HUD_WEAPON_TEXT, displayName);
        Dom.SetDomIdVisibility(Consts.HUD_WEAPON_TEXT, true);
        Dom.SetActiveInGroup(Consts.HUD_WEAPON_SELECT, Consts.HUD_WEAPON_ACTIVE, current.hud);
    }

    showPuff(x, y) {
        let puff = this.puffGroup.get(x, y);
        puff.setDepth(Depths.FREEZE_FX).setScale(1.5);
        puff.anims.play(Animations.FX_PUFF);
    }

    showSkyExplosion(x, y) {
        let explode = this.skyExplodeGroup.get(x, y);
        explode.setDepth(Depths.ENEMIES).setScale(.85);
        explode.anims.play(Animations.FX_SKY_EXPLODE);
    }

    showGroundExplosion(x) {
        let y = WorldConsts.GROUND_Y + 1;
        let explode = this.skyExplodeGroup.get(x, y);
        explode.setDepth(Depths.ENEMIES).setOrigin(.5, 1);
        explode.anims.play(Animations.FX_GROUND_EXPLODE);

        this.debrisEmitter.explode(24, x, y);
    }

    showSpark(x, y) {
        let spark = this.sparkGroup.get(x, y);
        spark.setDepth(Depths.FREEZE_FX);
        spark.anims.play(Animations.FX_GOLD_SPARK);
    }

    //rename
    showCollect(coinX) {

        let pY = this.player.getBottomCenter().y;
        let square = this.collectGroup.get(coinX, pY);
        square.setScale(2, .2).setOrigin(.5, 1).setDepth(this.player.depth + 1).setActive(true).setVisible(true);

        let tween = this.tweens.add({
            targets: square,
            delay: 100,
            duration: 1000,
            alpha: {from: 1, to: 0},
            scaleX: {from: 2, to: 0},
            scaleY: {from: 0, to: 4},
            ease: Phaser.Math.Easing.Quartic.Out,
            onComplete: ()=>{
                square.setActive(false).setVisible(false);
            }
        });
    }

    // rename
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
        sprite.showingIcon = true;
    }

    // rename
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

    // rename
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

    // enemyBomb - rename
    bombExplodeOnGround(posX) {
        
        //let players = this.collisionGroupPlayers.getChildren();
        let kins = this.collisionGroupCollectors.getChildren();
        let civs = this.collisionGroupCivilians.getChildren();

        let all = kins.concat(kins, civs);

        for (let sprite of all)
            if (Math.abs(posX - sprite.x) < WorldConsts.WIDTH * .1 && sprite.isAlive())
                sprite.hit();
        
        if (Math.abs(posX - this.player.x) < WorldConsts.WIDTH * .1 && this.player.isAlive()) {
            this.player.hit();
            if (this.player.isDead())
                this.playerDie();
        }

        this.smokeEmitter.explode(8, posX, WorldConsts.GROUND_Y);
        this.showGroundExplosion(posX);

        this.soundManager.play(Sfx.MISSLE_BLAST);
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
        let signs = [Decor.SIGN];

        for (let building of this.levelData.BUILDINGS) {

            let house = BackgroundBuilder.getHouse(this, building);
            this.add.existing(house);

            if (typeof house.interact === "function") {
                this.talkingGroup.add(house);
                this.physics.add.existing(house);
            }

            if (mapTypes.includes(building.type))
                this.buildings.set(building.type, house);
            
            if (houseTypes.includes(building.type)) {

                let scaffold = BackgroundBuilder.addScaffolding(house);
                house.setScaffold(scaffold);
                house.setCompletePercentAndCrop(building.complete);
                
                this.civSpawner.spawnCivilians(house);
            }
        }

        this.addBuldingCollisions();

        for (let forest of this.levelData.FORESTS)
            BackgroundBuilder.addForest(this, forest, this.windTrees);

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

    getPlayerBuilding() {
        return this.getBuilding(Buildings.PLAYER_HOUSE);
    }

    isAllHousesComplete() {
        let civs = this.collisionGroupCivilians.getChildren();
        for (let c of civs)
            if (!c.isHomeComplete())
                return false;
        return true;
    }

    getRandomUnfinishedHouse() {
        let civs = this.collisionGroupCivilians.getChildren();
        let houses = civs.map(civ => {
            if (!civ.isHomeComplete())
                return civ.getHome();
        });
        houses = houses.filter(ele => ele !== undefined);
        return Phaser.Utils.Array.GetRandom(houses);
    }

    getLevelWidth() {
        return this.levelData.LENGTHS * WorldConsts.WIDTH;
    }

    stopGameControls() {
        this.controlpad.setActive(false);
    }
}
export default Game;