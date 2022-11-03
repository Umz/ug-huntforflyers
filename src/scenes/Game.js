import SpriteGenerator from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import Prey from "../prey/Prey";

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
        
        this.addGround();   // Extract
        this.addHouse();    // Extract

        //  Add Playable characters

        this.addPlayerToScene();    // Extract
        for (let i=0;i<10;i++)
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

        this.allUpdaters.add(player.sprite);
        this.collisionGroupPlayers.add(player.sprite);

        SpriteGenerator.addPhysics(player.sprite);

        this.controlpad.addControlTarget(player.controller);
    }

    addGround() {
        const camera = this.cameras.main;
        let x = camera.width * .5;
        let y = camera.height - (20);
        let ground = this.add.rectangle(x, y, camera.width, 40, 0x444444);
        this.physics.add.existing(ground);
        this.platforms.add(ground);
    }

    addHouse() {
        let image = this.add.image(150, 280, 'house').setOrigin(.5, 1);
    }
};
export default Game;