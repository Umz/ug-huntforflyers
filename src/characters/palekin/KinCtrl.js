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

        let levelWidth = this.scene.getLevelWidth();
        let randX = this.sprite.x + Phaser.Math.Between(-48, 48);
        let toX = Phaser.Math.Wrap(randX, 32, levelWidth - 32);

        let labTable = this.scene.getBuilding(Buildings.LAB_TABLE);

        this.addActionChain()
            .chain(new CtrMoveToX(this.sprite, labTable.worldX))
            .chain(new CtrSpeak(this.sprite, Textures.ICON_HAMMER, 5000))
            .chain(new CtrWait(Phaser.Math.Between(1000, 3000)))
            .chain(new CtrMoveToX(this.sprite, toX))
            .chain(new CtrWait(Phaser.Math.Between(3000, 9000)))
    }
}
export default KinCtrl;