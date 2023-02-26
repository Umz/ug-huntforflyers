import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import Buildings from "../../consts/Buildings";
import GameSave from "../../components/GameSave";
import Textures from "../../consts/Textures";
import Sfx from "../../consts/Sfx";

class PaleKinCtrl extends BaseController {

    setDefaultActions() {
        let targetHouse = this.scene.getRandomUnfinishedHouse();
        if (GameSave.GetScore() > 0 && targetHouse) {
            this.collectAndDeliver(targetHouse)
        }
        else
            this.moveRand();
    }

    moveRand() {
        let levelWidth = this.scene.getLevelWidth();
        let randX = this.sprite.x + Phaser.Math.Between(-48, 48);
        let toX = Phaser.Math.Wrap(randX, 32, levelWidth - 32);
        this.addActionChain()
            .chain(new CtrMoveToX(this.sprite, toX))
            .chain(new CtrWait(Phaser.Math.Between(7000, 11000)));
    }

    collectAndDeliver(targetHouse) {
        let currency = 0;
        let labTable = this.scene.getBuilding(Buildings.LAB_TABLE);
        this.addActionChain()
            .chain(new CtrMoveToX(this.sprite, labTable.worldX).addCallback(()=>{
                let requestedAmount = Math.min(targetHouse.amountNeededToComplete(), 15);
                currency = GameSave.UpdateScoreAndDom(-requestedAmount);
                if (currency === 0)
                    this.clearAllActions();
            }))
            .chain(new CtrWait(2000).addCallback(()=>{
                this.scene.showIcon(this.sprite, 3000, Textures.ICON_HAMMER);
            }))
            .chain(new CtrMoveToX(this.sprite, targetHouse.x).addCallback(()=>{
                targetHouse.add(currency);
                this.scene.showIcon(this.sprite, 3000, Textures.ICON_HAMMER);
                let sound = targetHouse.isComplete() ? Sfx.CIV_BUILD_COMPLETE : Sfx.CIV_BUILDING;
                this.scene.soundManager.playLimited(sound);
            }))
            .chain(new CtrWait(2000))
    }
}
export default PaleKinCtrl;