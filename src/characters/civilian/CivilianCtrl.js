import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import Buildings from "../../consts/Buildings";
import GameSave from "../../components/GameSave";
import Dom from "../../components/Dom";
import Sfx from "../../consts/Sfx";

class CivilianCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        this.addNoActionListener();     // DELETE after Base removed
    }

    setDefaultActions() {

        if (GameSave.GetScore() > 0 && !this.spriteNew.isHomeComplete()) {
            this.gotoLabTable();
        }
        else {
            
            let rand = Phaser.Math.Between(1, 4);
            switch (rand) {
    
                case 1: this.move100(); break;
    
                case 2: this.returnHome(); break;
    
                case 3: this.waitRandomTime(); break;
    
                case 4: this.speakAndWait(); break;
            }
        }
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

    gotoLabTable() {
        let tableX = this.scene.getBuilding(Buildings.LAB_TABLE).worldX;
        this.addActionNew(new CtrMoveToX(this.spriteNew, tableX).addCallback(()=>{
            this.collectCoin();
        }));
    }

    collectCoin() {
        let sndM = this.scene.soundManager;
        this.spriteNew.setVelocityY(-16);
        this.addActionNew(new CtrWait(1000).addCallback(()=>{
            this.spriteNew.setCoins(GameSave.UpdateScoreAndDom(-10));
            sndM.playLimited(Sfx.CIV_COLLECT);
            this.returnHomeAndDepositCoin();
        }));
    }

    returnHomeAndDepositCoin() {
        let sndM = this.scene.soundManager;
        let homeX = this.spriteNew.getHomeX();
        this.addActionNew(new CtrMoveToX(this.spriteNew, homeX).addCallback(()=>{
            this.spriteNew.addCoinsToHome();

            let sound = this.sprite.isHomeComplete() ? Sfx.CIV_BUILD_COMPLETE : Sfx.CIV_BUILDING;
            sndM.playLimited(sound);
        }));
    }
}
export default CivilianCtrl;