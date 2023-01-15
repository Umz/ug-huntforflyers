import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";

class CivilianCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        this.addNoActionListener();     // DELETE after Base removed
    }

    setDefaultActions() {

        let rand = Phaser.Math.Between(1, 4);
        switch (rand) {

            case 1: this.move100(); break;

            case 2: this.returnHome(); break;

            case 3: this.waitRandomTime(); break;

            case 4: this.speakAndWait(); break;
        }
        console.log('Action Chosen', rand);
    }

    speakAndWait() {
        //console.log('Speaking civilian')
        this.spriteNew.setVelocityY(-32);
        this.addActionNew(new CtrWait(3000));
    }

    waitRandomTime() {
        let rand = Phaser.Math.Between(3000, 7000);
        this.addActionNew(new CtrWait(rand));
    }

    move100() {

        let levelWidth = this.scene.getLevelWidth();
        let randX = this.spriteNew.x + (Math.random() > .5 ? -1 : 1) * 100;
        let toX = Phaser.Math.Wrap(randX, 32, levelWidth - 32);

        this.addActionNew(new CtrMoveToX(this.spriteNew, toX));
    }

    returnHome() {
        let homeX = this.spriteNew.getHomeX();
        this.addActionNew(new CtrMoveToX(this.spriteNew, homeX));
    }
}
export default CivilianCtrl;