import CtrBlank from "../actions/CtrBlank";
import CtrWait from "../actions/CtrWait";
import CtrMoveToX from "../actions/CtrMoveToX";
import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class CivilianCtrl extends BaseController {
    constructor(target) {
        super(target);
        this.actionTest();
    }

    actionTest() {

        let action = new CtrBlank()
        action.subclassUpdate = (time, delta) => {

            if (this.target.isStateEquals(States.NORMAL)) {

                let rand = Phaser.Math.Between(1, 4);
                
                switch (rand) {

                    case 1:
                        this.move100m();
                        break;

                    case 2:
                        this.returnHome();
                        break;

                    case 3:
                        this.waitRandom();
                        break;

                    case 4:
                        this.speakAndWait();
                        break;
                }

                this.target.setState(States.GENERAL);
            }
        };
        this.addAction(action);
    }

    speakAndWait() {
        //console.log('Speaking civilian')
        this.sprite.setVelocityY(-32);
        this.addAction(new CtrWait(3000).addCallback(()=>{
            this.returnState();
        }));
    }

    waitRandom() {
        let rand = Phaser.Math.Between(3000, 7000);
        this.addAction(new CtrWait(3000).addCallback(()=>{
            this.returnState();
        }));
    }

    move100m() {
        let toX = this.sprite.x + (Math.random() > .5 ? -1 : 1) * 100;
        this.addAction(new CtrMoveToX(this.target, toX).addCallback(()=>{
            this.returnState();
        }));
    }

    returnHome() {
        let homeX = this.target.homeData.worldX;
        this.addAction(new CtrMoveToX(this.target, homeX).addCallback(()=>{
            this.returnState();
        }));
    }

    returnState() {
        this.target.setState(States.NORMAL);
    }
}
export default CivilianCtrl;