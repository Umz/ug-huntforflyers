import SpriteGenerator from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import Prey from "../prey/Prey";
import WorldConsts from "../WorldConsts";

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

        this.addBackground();
        
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

    addBackground() {

        const width = WorldConsts.WIDTH;
        const height = WorldConsts.HEIGHT;

        //  ADD the background layers

        for (let i=0; i<5; i++)
            this.add.tileSprite(0, 0, width, height, `bg_layer_${i}`).setOrigin(0);

        //  ADD the ground

        let ground = this.add.rectangle(0, WorldConsts.GROUND_Y, width, 10, 0x000000).setOrigin(0);
        this.physics.add.existing(ground);
        this.platforms.add(ground);

        this.add.tileSprite(0, WorldConsts.GROUND_Y, width, 64, `bg_ground_0`).setOrigin(0);

        //  Add buildings

        let house = this.add.image(200, WorldConsts.GROUND_Y, 'house').setOrigin(.5, 1);
        let pump = this.add.image(250, WorldConsts.GROUND_Y, 'pump').setOrigin(.5, 1);
        let table = this.add.image(150, WorldConsts.GROUND_Y, 'labTable').setOrigin(.5, 1);

        let bush = this.add.image(400, WorldConsts.GROUND_Y, 'bush').setOrigin(.5, 1);
        let tree1 = this.add.image(380, WorldConsts.GROUND_Y, 'tree1').setOrigin(.5, 1);
        let tree2 = this.add.image(420, WorldConsts.GROUND_Y, 'tree2').setOrigin(.5, 1);
        let tree3 = this.add.image(450, WorldConsts.GROUND_Y, 'tree2').setOrigin(.5, 1).setFlipX(true);
    }

    addHouse() {
        let image = this.add.image(150, 280, 'house').setOrigin(.5, 1);
    }
};
export default Game;