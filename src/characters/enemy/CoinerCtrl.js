import BaseController from "classes/BaseController";
import CtrFindCoin from "actions/CtrFindCoin";
import CtrStealCoin from "actions/CtrStealCoin";

class CoinerCtrl extends BaseController {

    constructor(target) {
        super(target);
        this.scene = this.sprite.scene;
        this.findCoin();
    }

    findCoin() {
        this.addAction(new CtrFindCoin(this.target).addCallback(()=>{
            this.attemptStealCoin();
        }));
    }

    attemptStealCoin() {
        let coin = this.scene.getClosestCoin(this.sprite);
        if (coin) {
            if (!coin.claimed) {
                this.addAction(new CtrStealCoin(this.target, coin, this.spawnPoint).addCallback(()=>{
                    this.findCoin();
                }));
                coin.claimed = true;
            }
            else
                this.findCoin();
        }
    }

    setPoint(x) {
        this.spawnPoint = x;
    }
}
export default CoinerCtrl;