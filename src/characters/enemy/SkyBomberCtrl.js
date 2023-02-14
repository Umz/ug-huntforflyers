import CtrEnemyFly from "actions/CtrEnemyFly";
import CtrMoveToTargetX from "actions/CtrMoveToTargetX";
import CtrMoveToX from "actions/CtrMoveToX";
import CtrWait from "actions/CtrWait";
import BaseController from "classes/BaseController";
import CtrCarryRocket from "../../actions/CtrCarryRocket";
import Sfx from "../../consts/Sfx";

class ThiefCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
    }
    
    setDefaultActions() {

        let player = this.scene.player;
        if (player.isAlive()) {
            this.addAction(new CtrWait(Phaser.Math.Between(4000, 7000)).addCallback(()=>{
                this.dropRocketOnPlayer();
            }));
        }
        else {
            let playerBuilding = this.scene.getPlayerBuilding();
            let randomDistance = Phaser.Math.Between(-96, 96);
            let toX = playerBuilding.worldX + randomDistance;
            this.addActionChain()
                .chain(new CtrMoveToX(this.sprite, toX).addCallback(()=>{
                    this.scene.showIcon(this.sprite, 1000, 'ic_hammer');
                    this.sprite.setVelocityX(this.sprite.velocityX * .1);
                }))
                .chain(new CtrWait(Phaser.Math.Between(7000, 10000)).addCallback(()=>{
                    this.clearAllActions();
                }))
        }

        this.addAction(new CtrEnemyFly(this.sprite));
    }

    dropRocketOnPlayer() {

        let player = this.scene.player;
        let rocket = this.scene.addRocketToScene();

        this.addAction(new CtrCarryRocket(this.sprite, rocket));
        this.addActionChain()
            .chain(new CtrMoveToTargetX(this.sprite, player).addCallback(()=>{
                this.dropRocket(rocket);
            }));
    }

    dropRocket(rocket) {

        this.clearAllActions();

        this.sprite.setVelocityX(this.sprite.velocityX * .2);
        rocket.drop();

        let sndM = this.scene.soundManager;
        sndM.play(Sfx.BOMBER_DROP_MISSLE);
    }

    hit() {
        
        this.sprite.setY(this.sprite.y - 8);

        if (this.sprite.isDead()) {
            this.sprite.kill();
            this.sprite.destroy();
            //  Blow up BIG in sky (holding a rocket)
        }
    }
}
export default ThiefCtrl;