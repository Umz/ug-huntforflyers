import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";
import GameSave from "../components/GameSave";
import Consts from "../consts/Consts";
import Forest from "../classes/Forest";
import PlantType from "../consts/PlantType";
import Depths from "../consts/Depths";

class Menu extends Phaser.Scene {

    constructor() {
        super(Consts.MENU_SCENE);
    }

    create(data) {

        GameSave.SetScore(0);

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);
        BackgroundBuilder.addForest(this, Forest.New().setTileX(4).setSize(10)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2)
        );

        DomHandler.SetDomText(Consts.UI_SCORE_TEXT, 0);

        DomHandler.AddClick(Consts.MAIN_PLAY_BUTTON, ()=> {
            DomHandler.SetDomIdDisplay(Consts.MAIN_MENU, false);
            DomHandler.SetDomIdDisplay(Consts.MAIN_LOGO, false);
            DomHandler.SetDomIdDisplay(Consts.UI, true);
            DomHandler.ResetClick(Consts.MAIN_PLAY_BUTTON);

            this.scene.start(Consts.GAME_SCENE);
        });
    }
}
export default Menu;