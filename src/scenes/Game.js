import SpriteGenerator from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";

class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create(data) {

        const camera = this.cameras.main;

        this.physics.world.setBounds(0, 0, camera.width, camera.height);

        this.platforms = this.physics.add.group({immovable:true});
        this.players = this.physics.add.group();

        this.physics.add.collider(this.platforms, this.players);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        
        this.addGround();   // Extract

        //  Add Playable characters

        this.addPlayerToScene(); // Extract-
    }

    addPlayerToScene() {

        this.player = new Player(this);
        this.players.add(this.player.sprite);
        SpriteGenerator.addPhysics(this.player.sprite);

        this.controlpad.addControlTarget(this.player.controller);
    }

    addGround() {
        const camera = this.cameras.main;
        let x = camera.width * .5;
        let y = camera.height - (20);
        let ground = this.add.rectangle(x, y, camera.width, 40, 0x444444);
        this.physics.add.existing(ground);
        this.platforms.add(ground);
    }

    update(time, delta) {
        this.controlpad.update(time, delta);
    }
    
};
export default Game;