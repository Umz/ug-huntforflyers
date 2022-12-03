import SpriteBuilder from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import WorldConsts from "../consts/WorldConsts";
import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";
import Consts from "../consts/Consts";
import States from "../classes/States";
import GameSave from "../components/GameSave";
import LevelRegistry from "../registry/LevelRegistry";
import Levels from "../consts/Levels";
import BirdSpawner from "../spawner/BirdSpawner";
import UpdateRunner from "../components/UpdateRunner";

class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create(data) {

        const CURRENT_LEVEL = Levels.HOME_1;

        this.levelData = LevelRegistry.GetLevelData(CURRENT_LEVEL);

        const LEVEL_WIDTH = this.levelData.LENGTHS * WorldConsts.WIDTH;

        this.updateRunner = new UpdateRunner();

        this.physics.world.setBounds(0, 0, LEVEL_WIDTH, WorldConsts.HEIGHT);

        this.platforms = this.physics.add.group({ immovable: true });
        this.spriteUpdateGroup = this.add.group({ runChildUpdate: true });

        this.collisionGroupPlayers = this.physics.add.group();
        this.collisionGroupEnemies = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.collisionGroupPlayers);
        this.physics.add.collider(this.platforms, this.collisionGroupEnemies);

        this.physics.add.overlap(this.collisionGroupPlayers, this.collisionGroupEnemies, this.overlapPlayerPrey, null, this);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        this.controlpad.action = ()=>{
            let p = this.collisionGroupEnemies.getFirstAlive();
            if (p)
                p.freeze();
        }
        this.updateRunner.add(this.controlpad);

        this.addDOMControl();
        this.addBackground();
        
        //  Add Playable characters
        this.addPlayerToScene();    // Extract

        this.birdSpawner = new BirdSpawner(this);
        this.updateRunner.add(this.birdSpawner);
    }

    update(time, delta) {
        this.updateRunner.update(time, delta);
    }

    overlapPlayerPrey(player, prey) {
        let preyState = prey.parent.state;
        if (preyState == States.FROZEN) {

            let points = 1;
            GameSave.IncScore(points);
            DomHandler.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());

            prey.setActive(false).setVisible(false);
            this.collisionGroupEnemies.remove(prey);
        }
    }

    addBirdToGroups(sprite) {
        this.spriteUpdateGroup.add(sprite);
        this.collisionGroupEnemies.add(sprite);
        SpriteBuilder.addFlightPhysics(sprite);
    }

    addPlayerToScene() {

        let building = this.levelData.BUILDINGS[0];     //  CLEAN -
        let player = new Player(this).init();
        player.setPosition(building.worldX, WorldConsts.GROUND_Y - 32);

        this.spriteUpdateGroup.add(player.sprite);
        this.collisionGroupPlayers.add(player.sprite);

        SpriteBuilder.addPhysics(player.sprite);

        this.controlpad.addControlTarget(player.controller);
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

            this.scene.start('MenuScene');
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

            this.scene.start('MenuScene');
        });
    }
}
export default Game;