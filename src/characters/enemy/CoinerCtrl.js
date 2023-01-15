import BaseController from "classes/BaseController";
import CtrFindCoin from "actions/CtrFindCoin";
import CtrStealCoin from "actions/CtrStealCoin";

class CoinerCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;

        this.addNoActionListener();     // DELETE after Base removed
    }

    setDefaultActions() {
        this.addActionNew(new CtrFindCoin(this.target).addCallback(()=>{
            this.attemptStealCoin();
        }));
    }

    attemptStealCoin() {
        let coin = this.scene.getClosestCoin(this.spriteNew);
        if (coin) {
            if (!coin.claimed) {
                this.addActionNew(new CtrStealCoin(this.spriteNew, coin, this.spawnPoint));
                coin.claimed = true;
            }
        }
    }

    setPoint(x) {
        this.spawnPoint = x;
    }
}
export default CoinerCtrl;