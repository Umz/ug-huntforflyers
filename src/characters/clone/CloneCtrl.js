import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import CtrSpeak from "actions/CtrSpeak";
import Textures from "../../consts/Textures";

class CloneCtrl extends BaseController {

    setDefaultActions() {

        let base = this.scene.getPlayerBuilding();
        let randX = base.worldX + Phaser.Math.Between(-32, 32);
        let icon = Phaser.Utils.Array.GetRandom([Textures.ICON_BEER]);

        this.addActionChain()
            .chain(new CtrMoveToX(this.sprite, base.worldX))
            .chain(new CtrSpeak(this.sprite, icon, 1000))
            .chain(new CtrWait(Phaser.Math.Between(1000, 3000)))
            .chain(new CtrMoveToX(this.sprite, randX))
            .chain(new CtrWait(Phaser.Math.Between(3000, 6000)))
    }
}
export default CloneCtrl;