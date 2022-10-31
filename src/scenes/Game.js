import SpriteGenerator from "../components/SpriteBuilder";
import Controlpad from "../components/Controlpad";
import Player from "../player/Player";
import WorldConsts from "../WorldConsts";

class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create(data) {

        const camera = this.cameras.main;

        this.physics.world.setBounds(0, 0, camera.width, camera.height);

        this.platforms = this.physics.add.group({immovable:true});
        this.players = this.physics.add.group();
        this.allPrey = this.physics.add.group({
            runChildUpdate: true
        });

        this.physics.add.collider(this.platforms, this.players);
        this.physics.add.collider(this.platforms, this.allPrey);

        this.controlpad = new Controlpad(this);
        this.controlpad.addKeyboardControl();
        
        this.addGround();   // Extract

        let image = this.add.image(150, 260, 'house').setOrigin(.5, 1);

        //  Add Playable characters

        this.addPlayerToScene(); // Extract-

        let amt = 20;
        for (let i=0;i<amt;i++)
            this.addPreyToScene();  // Extract inner
    }

    addPreyToScene() {

        const startX = 400;
        const space = 60;
        const zoneLeft = startX - space;
        const zoneRight = startX + space;

        const speed = WorldConsts.BASE_MOVE_SPEED * 1.2;

        let sprite = SpriteGenerator.spawnFlyingSprite(this, 'fairy1');
        this.allPrey.add(sprite);
        SpriteGenerator.addFlightPhysics(sprite);

        sprite.body.setMaxSpeed(speed);
        sprite.setAccelerationX(speed);

        sprite.setX(sprite.x + Phaser.Math.Between(-50, 50))
        sprite.setY(sprite.y - Phaser.Math.Between(0, 25))

        const variation = Phaser.Math.Between(-10, 10);
        const accel = speed * .5;

        let timer = 500;
        let count = 1;

        sprite.update = function(time, delta) {

            timer -= delta;
            if (timer <= 0) {
                count = (count + 1) > 4 ? 1 : (count + 1);
                timer = 50;
                this.setTexture(`fairy${count}`);
            }

            if (this.body.velocity.y > 10)
                this.setAccelerationY(- (250 + variation))
            if (this.y < WorldConsts.FLYING_HEIGHT_MID_Y + variation)
                this.setAccelerationY(0);

            if (this.x > zoneRight)
                this.setAccelerationX(-accel);
            if (this.x < zoneRight)
                this.setAccelerationX(accel);
            
        }

        sprite.gameFreeze = function() {
            this.setAcceleration(0);
            this.setVelocity(0);
            this.setTintFill(0xFFFFFF);
            sprite.setActive(false);
        }
        
        this.controlpad.action = ()=>{
            let p = this.allPrey.getFirstAlive();
            if (p)
                p.gameFreeze();
        }
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