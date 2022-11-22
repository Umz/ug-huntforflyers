import SpriteGenerator from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import Prey from "../prey/Prey";
import WorldConsts from "../consts/WorldConsts";
import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";
import Consts from "../consts/Consts";
import States from "../classes/States";
import GameSave from "../components/GameSave";
import LevelRegistry from "../registry/LevelRegistry";
import Levels from "../consts/Levels";

class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create(data) {

        const CURRENT_LEVEL = Levels.HOME_1;

        this.levelData = LevelRegistry.GetLevelData(CURRENT_LEVEL);

        this.physics.world.setBounds(0, 0, this.levelData.width, WorldConsts.HEIGHT);

        this.platforms = this.physics.add.group({ immovable: true });
        this.allUpdaters = this.add.group({ runChildUpdate: true });

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

        this.addDOMControl();

        this.addBackground();
        
        //  Add Playable characters

        this.addPlayerToScene();    // Extract

        for (let i=0;i<20;i++)
            this.addPreyToScene();  // Extract inner
    }

    update(time, delta) {
        this.controlpad.update(time, delta);
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

    addPreyToScene() {

        let prey = new Prey(this);
        
        this.allUpdaters.add(prey.sprite);
        this.collisionGroupEnemies.add(prey.sprite);

        SpriteGenerator.addFlightPhysics(prey.sprite);

        prey.init();
    }

    addPlayerToScene() {

        let building = this.levelData.buildings[0];     //  CLEAN -
        let player = new Player(this).init();
        player.setPosition(building.worldX, WorldConsts.GROUND_Y - 32);

        this.allUpdaters.add(player.sprite);
        this.collisionGroupPlayers.add(player.sprite);

        SpriteGenerator.addPhysics(player.sprite);

        this.controlpad.addControlTarget(player.controller);
    }

    addBackground() {

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);

        for (let building of this.levelData.buildings)
            BackgroundBuilder.addBuilding(this, building);
        
        for (let forest of this.levelData.forests)
            BackgroundBuilder.addForest(this, forest.worldX, forest.size);
        
        //  ADD the ground - physics

        let ground = this.add.rectangle(0, WorldConsts.GROUND_Y, this.levelData.width, 10, 0x000000).setOrigin(0).setVisible(false);
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