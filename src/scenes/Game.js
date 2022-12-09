import SpriteBuilder from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import WorldConsts from "../consts/WorldConsts";
import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";
import Consts from "../consts/Consts";
import States from "../consts/States";
import GameSave from "../components/GameSave";
import LevelRegistry from "../registry/LevelRegistry";
import BirdSpawner from "../spawner/BirdSpawner";
import UpdateRunner from "../components/UpdateRunner";
import Depths from "../consts/Depths";

class Game extends Phaser.Scene {

    constructor() {
        super(Consts.GAME_SCENE);
    }

    create(data) {

        const CURRENT_STAGE = GameSave.GetStage();

        this.levelData = LevelRegistry.GetLevelData(CURRENT_STAGE);

        const LEVEL_WIDTH = this.levelData.LENGTHS * WorldConsts.WIDTH;

        this.updateRunner = new UpdateRunner();

        this.physics.world.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);
        this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);

        this.platforms = this.physics.add.group({ immovable: true });
        this.spriteUpdateGroup = this.add.group({ runChildUpdate: true });
        this.bulletGroup = this.physics.add.group({
            defaultKey: 'bullet',
            runChildUpdate: true,
            maxSize: 5
        });
        this.liveBirdGroup = this.add.group();
        
        this.collisionGroupPlayers = this.physics.add.group();
        this.collisionGroupEnemies = this.physics.add.group();
        this.collisionGroupBullets = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.collisionGroupPlayers);
        this.physics.add.collider(this.platforms, this.collisionGroupEnemies);

        this.physics.add.overlap(this.collisionGroupPlayers, this.collisionGroupEnemies, this.overlapPlayerPrey, null, this);
        this.physics.add.overlap(this.collisionGroupBullets, this.collisionGroupEnemies, this.overlapBulletEnemy, null, this);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        this.controlpad.action = ()=>{
            if (this.player.isStateEquals(States.NORMAL)) {
                this.player.fireBullet();
                this.fireBullet();
            }
        }
        this.updateRunner.add(this.controlpad);

        this.addDOMControl();
        this.addBackground();
        
        //  Add Playable characters
        this.addPlayerToScene();    // Extract

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

    overlapPlayerPrey(player, prey) {
        if (prey.parent.isStateEquals(States.FROZEN)) {
            GameSave.IncScore(prey.parent.getValue());
            DomHandler.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
            prey.setActive(false).setVisible(false);
            this.collisionGroupEnemies.remove(prey);
        }
    }

    overlapBulletEnemy(bullet, enemy) {
        if (enemy.parent.isStateEquals(States.NORMAL)) {
            this.collisionGroupBullets.remove(bullet);
            this.liveBirdGroup.remove(enemy);
            bullet.setActive(false).setVisible(false);
            enemy.freeze();
        }
    }

    setupLevel() {
        // Forests, spawners, difficulties
    }

    addBirdToGroups(sprite) {
        this.liveBirdGroup.add(sprite);
        this.spriteUpdateGroup.add(sprite);
        this.collisionGroupEnemies.add(sprite);
    }
    
    addFlightPhysics(sprite) {
        SpriteBuilder.addFlightPhysics(sprite);
    }

    addPlayerToScene() {

        let building = this.levelData.BUILDINGS[0];     //  CLEAN -
        let player = new Player(this).init();

        let pos = building || {worldX: 120};
        player.setPosition(pos.worldX, WorldConsts.GROUND_Y - 32);
        this.player = player;

        this.spriteUpdateGroup.add(player.sprite);
        this.collisionGroupPlayers.add(player.sprite);

        SpriteBuilder.addPhysics(player.sprite);

        this.controlpad.addControlTarget(player.controller);

        let camera = this.cameras.main;
        camera.startFollow(player.getSprite());
    }

    fireBullet() {
        
        let target = this.physics.closest(this.player, this.liveBirdGroup.getChildren()) || new Phaser.Geom.Point(this.player.x, this.player.y - 32);
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

    getClosestBird() {
    }

    getLiveBirdsCount() {
        return this.collisionGroupEnemies.countActive();
    }

    addBackground() {

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);

        for (let building of this.levelData.BUILDINGS)
            BackgroundBuilder.addBuilding(this, building);
        
        for (let forest of this.levelData.FORESTS)
            BackgroundBuilder.addForest(this, forest);
                    
        let levelWidth = this.levelData.LENGTHS * WorldConsts.WIDTH;
            
            //  ADD the ground - physics
        let ground = this.add.rectangle(0, WorldConsts.GROUND_Y, levelWidth, 10, 0x000000).setOrigin(0).setVisible(false);
        this.physics.add.existing(ground);
        this.platforms.add(ground);
    }

    addDOMControl() {

        //  GUI

        DomHandler.AddClick(Consts.UI_PAUSE_BUTTON, ()=> {
            DomHandler.SetDomIdDisplay(Consts.UI, false);
            DomHandler.SetDomIdDisplay(Consts.MENU_BG, true);
            DomHandler.SetDomIdDisplay(Consts.PAUSE_MENU, true);
            this.scene.pause();
        });

        //  PAUSE MENU

        DomHandler.AddClick(Consts.PAUSE_PLAY_BUTTON, ()=> {
            DomHandler.SetDomIdDisplay(Consts.UI, true);
            DomHandler.SetDomIdDisplay(Consts.MENU_BG, false);
            DomHandler.SetDomIdDisplay(Consts.PAUSE_MENU, false);
            this.scene.resume();
        });

        DomHandler.AddClick(Consts.PAUSE_HOME_BUTTON, ()=> {
            DomHandler.SetDomIdDisplay(Consts.MENU_BG, false);
            DomHandler.SetDomIdDisplay(Consts.PAUSE_MENU, false);
            DomHandler.ResetClicks(Consts.SC_GAME_BUTTONS);

            DomHandler.SetDomIdDisplay(Consts.MAIN_MENU, true);
            DomHandler.SetDomIdDisplay(Consts.MAIN_LOGO, true);

            this.scene.start(Consts.MENU_SCENE);
        });

        DomHandler.AddClick(Consts.PAUSE_SOUND_BUTTON, ()=> {
            DomHandler.SetDomIdDisplay(Consts.PAUSE_MENU, false);
            DomHandler.SetDomIdDisplay(Consts.RESULTS_MENU, true);
        });

        //  RESULTS / GAME OVER

        DomHandler.AddClick(Consts.RESULTS_HOME_BUTTON, ()=>{
            DomHandler.SetDomIdDisplay(Consts.MENU_BG, false);
            DomHandler.SetDomIdDisplay(Consts.RESULTS_MENU, false);
            DomHandler.ResetClicks(Consts.SC_GAME_BUTTONS);

            DomHandler.SetDomIdDisplay(Consts.MAIN_MENU, true);
            DomHandler.SetDomIdDisplay(Consts.MAIN_LOGO, true);

            this.scene.start(Consts.MENU_SCENE);
        });
    }
}
export default Game;