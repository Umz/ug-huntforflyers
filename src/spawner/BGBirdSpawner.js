import Animations from "../consts/Animations";
import Depths from "../consts/Depths";

class BGBirdSpawner {
    constructor(scene) {
        this.scene = scene;
        //  ON timer - push out birds in the background that flap and vanish -
        //  Tween in- move slightly in the sky 
        //  Tween out -

        for (let i = 0; i < 30; i++) {

            let startX = Phaser.Math.Between(140, 340);
            let startY = Phaser.Math.Between(40, 80);

            let sprite = scene.add.sprite(startX, startY, 'flyers', Animations.BAT).setDepth(Depths.BG_ANIMATION);
            sprite.anims.play(Animations.BAT);

            sprite.setTint(0x555555).setScale(.25);
            sprite.sf = (4 * .15);
            sprite.of = startX;
            const moveX = Phaser.Math.Between(6, 10);
            //const moveY = Phaser.Math.Between(-2, -4);
            const moveY = 0;

            sprite.update = function(time, delta) {
                let camera = this.scene.cameras.main;
                //this.x = camera.scrollX * this.sf + this.of;
                this.of += (moveX * .001) * delta;
                this.x = camera.scrollX * this.sf + this.of;
                this.y += (moveY * .001) * delta;
            }

            scene.updateRunner.add(sprite);
        }
    }
}
export default BGBirdSpawner;