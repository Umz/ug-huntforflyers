import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import Buildings from "../../consts/Buildings";
import GameSave from "../../components/GameSave";
import Sfx from "../../consts/Sfx";
import Textures from "../../consts/Textures";
import ActionChain from "../../classes/ActionChain";

class CivilianCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
    }

    setDefaultActions() {

        if (GameSave.GetScore() > 0 && !this.sprite.isHomeComplete()) {
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
        this.scene.showIcon(this.sprite, 3000, Textures.ICON_SPEECH);
        this.sprite.setVelocityY(-32);
        this.addAction(new CtrWait(3000));
    }

    waitRandomTime() {
        let rand = Phaser.Math.Between(3000, 7000);
        this.addAction(new CtrWait(rand));
    }

    move100() {

        let levelWidth = this.scene.getLevelWidth();
        let randX = this.sprite.x + (Math.random() > .5 ? -1 : 1) * 100;
        let toX = Phaser.Math.Wrap(randX, 32, levelWidth - 32);

        this.addAction(new CtrMoveToX(this.sprite, toX));
    }

    returnHome() {
        let homeX = this.sprite.getHomeX();
        this.addAction(new CtrMoveToX(this.sprite, homeX));
    }

    gotoLabTable() {
        let tableX = this.scene.getBuilding(Buildings.LAB_TABLE).worldX;
        this.addAction(new CtrMoveToX(this.sprite, tableX).addCallback(()=>{
            this.collectCoin();
        }));
    }

    collectCoin() {

        let sndM = this.scene.soundManager;
        this.sprite.setVelocityY(-16);

        let requestedAmount = Math.min(this.sprite.coinsNeededForHome(), 10);
        let coins = GameSave.UpdateScoreAndDom(-requestedAmount);
        console.log('Coins taken: ', coins)
        if (coins > 0)
            this.addAction(new CtrWait(1000).addCallback(()=>{
                this.sprite.setCoins(coins);

                this.scene.showIcon(this.sprite, 3000, Textures.ICON_HAMMER);
                sndM.playLimited(Sfx.CIV_COLLECT);
                this.returnHomeAndDepositCoin();
            }));
        else
            this.scene.showIcon(this.sprite, 2000, Textures.ICON_EMPTY);
    }

    returnHomeAndDepositCoin() {
        let sndM = this.scene.soundManager;
        let homeX = this.sprite.getHomeX();
        this.addAction(new CtrMoveToX(this.sprite, homeX).addCallback(()=>{
            this.sprite.addCoinsToHome();
            this.scene.showIcon(this.sprite, 3000, Textures.ICON_HAMMER);
            this.waitRandomTime();

            let sound = this.sprite.isHomeComplete() ? Sfx.CIV_BUILD_COMPLETE : Sfx.CIV_BUILDING;
            sndM.playLimited(sound);
        }));
    }

    actionChain() {

        let act1 = new CtrWait(100).addCallback(()=>{ addChatMessage('Civ', 1) });
        let act2 = new CtrWait(1000).addCallback(()=>{ addChatMessage('Civ', 2) });
        let act3 = new CtrWait(100).addCallback(()=>{ addChatMessage('Civ', 3) });
        
        let chain = new ActionChain()
            .chain(act1)
            .chain(act2)
            .chain(act3);

        this.addAction(chain);
    }
}
export default CivilianCtrl;