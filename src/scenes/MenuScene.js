import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";
import GameSave from "../components/GameSave";
import Consts from "../consts/Consts";

class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    create(data) {

        GameSave.SetScore(0);

        DomHandler.SetDomText(Consts.UI_SCORE_TEXT, 0);

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);
        BackgroundBuilder.addForest(this, 220, 6);

        DomHandler.AddClick(Consts.MAIN_PLAY_BUTTON, ()=> {
            DomHandler.SetDomIdDisplay(Consts.MAIN_MENU, false);
            DomHandler.SetDomIdDisplay(Consts.MAIN_LOGO, false);
            DomHandler.SetDomIdDisplay(Consts.UI, true);
            DomHandler.ResetClick(Consts.MAIN_PLAY_BUTTON);

            this.scene.start('Game');
        });
    }
}
export default MenuScene;