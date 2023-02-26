import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import Buildings from "../../consts/Buildings";
import GameSave from "../../components/GameSave";
import Textures from "../../consts/Textures";
import Sfx from "../../consts/Sfx";
import CtrSpeak from "../../actions/CtrSpeak";

class KinCtrl extends BaseController {

    setDefaultActions() {

        let labTable = this.scene.getBuilding(Buildings.LAB_TABLE);
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
}
export default KinCtrl;