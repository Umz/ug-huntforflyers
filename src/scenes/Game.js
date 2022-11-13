import SpriteGenerator from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import Prey from "../prey/Prey";
import WorldConsts from "../WorldConsts";
import BackroundBuilder from "../background/BackgroundBuilder";
import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";
import Consts from "../Consts";

class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create(data) {

        const camera = this.cameras.main;

        this.physics.world.setBounds(0, 0, camera.width, camera.height);

        this.platforms = this.physics.add.group({ immovable: true });
        this.allUpdaters = this.add.group({ runChildUpdate: true });

        this.collisionGroupPlayers = this.physics.add.group();
        this.collisionGroupEnemies = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.collisionGroupPlayers);
        this.physics.add.collider(this.platforms, this.collisionGroupEnemies);

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

    addPreyToScene() {

        let prey = new Prey(this);
        
        this.allUpdaters.add(prey.sprite);
        this.collisionGroupEnemies.add(prey.sprite);

        SpriteGenerator.addFlightPhysics(prey.sprite);

        prey.init();
    }

    addPlayerToScene() {

        let player = new Player(this);
        player.init();

        this.allUpdaters.add(player.sprite);
        this.collisionGroupPlayers.add(player.sprite);

        SpriteGenerator.addPhysics(player.sprite);

        this.controlpad.addControlTarget(player.controller);
    }

    addBackground() {

        //  Level builder will have where the forests are
        //  Where the buildings are
        //  Stores all the co-ordinates

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);
        BackgroundBuilder.addPlayerBase(this);
        BackgroundBuilder.addPump(this);
        BackgroundBuilder.addForest(this, 350, 15);
        
        //  ADD the ground

        let ground = this.add.rectangle(0, WorldConsts.GROUND_Y, WorldConsts.WIDTH, 10, 0x000000).setOrigin(0).setVisible(false);
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