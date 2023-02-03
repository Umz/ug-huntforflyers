import BaseController from "classes/BaseController";
import CtrFindCoin from "actions/CtrFindCoin";
import CtrStealCoin from "actions/CtrStealCoin";

class CoinerCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
    }

    setDefaultActions() {
        this.addAction(new CtrFindCoin(this.target).addCallback(()=>{
            this.attemptStealCoin();
        }));
    }

    attemptStealCoin() {
        let coin = this.scene.getClosestCoin(this.sprite);
        if (coin) {
            if (!coin.claimed) {
                this.addAction(new CtrStealCoin(this.sprite, coin, this.spawnPoint));
                coin.claimed = true;
            }
        }
    }

    setPoint(x) {
        this.spawnPoint = x;
    }
}
export default CoinerCtrl;