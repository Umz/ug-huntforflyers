import BackgroundBuilder from "../background/BackgroundBuilder";
import Dom from "../components/Dom";
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
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3, PlantType.SUNFLOWER], Depths.FOREST_FG2)
        );

        Dom.SetDomText(Consts.UI_SCORE_TEXT, 0);

        Dom.AddClick(Consts.MAIN_PLAY_BUTTON, ()=> {
            Dom.SetDomIdDisplay(Consts.MAIN_MENU, false);
            Dom.SetDomIdDisplay(Consts.MAIN_LOGO, false);
            Dom.SetDomIdDisplay(Consts.UI, true);
            Dom.ResetClick(Consts.MAIN_PLAY_BUTTON);

            this.scene.start(Consts.GAME_SCENE);
        });
    }
}
export default Menu;