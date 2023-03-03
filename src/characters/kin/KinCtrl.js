import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import Textures from "../../consts/Textures";
import Depths from "../../consts/Depths";
import CtrSpeak from "../../actions/CtrSpeak";

class KinCtrl extends BaseController {

    setDefaultActions() {

        let labTable = this.scene.getBuilding(this.localBuilding);
        let levelWidth = this.scene.getLevelWidth();
        let randX = labTable.worldX + Phaser.Math.Between(-24, 24);
        let toX = Phaser.Math.Wrap(randX, 32, levelWidth - 32);
        let icon = Phaser.Utils.Array.GetRandom([Textures.ICON_BEER, Textures.ICON_WINE]);

        this.addActionChain()
            .chain(new CtrMoveToX(this.sprite, labTable.worldX))
            .chain(new CtrSpeak(this.sprite, icon, 5000))
            .chain(new CtrWait(Phaser.Math.Between(1000, 3000)))
            .chain(new CtrMoveToX(this.sprite, toX))
            .chain(new CtrWait(Phaser.Math.Between(3000, 9000)))
    }

    init(building) {

        this.localBuilding = building;

        this.sprite.setDepth(Depths.BUILDINGS_BEHIND);
        this.addActionChain()
            .chain(new CtrWait(2000))
            .chain(new CtrMoveToX(this.sprite, this.sprite.x + 24).addCallback(()=>{
                this.sprite.setDepth(Depths.CIVILIANS);
            }))
            .chain(new CtrSpeak(this.sprite, Textures.ICON_SPEECH, 5000))
            .chain(new CtrWait(Phaser.Math.Between(1000, 3000)))
    }

}
export default KinCtrl;