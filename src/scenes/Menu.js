import BackgroundBuilder from "../background/BackgroundBuilder";
import Dom from "../components/Dom";
import GameSave from "../components/GameSave";
import Consts from "../consts/Consts";
import Forest from "../classes/Forest";
import PlantType from "../consts/PlantType";
import Depths from "../consts/Depths";
import Sfx from "../consts/Sfx";

class Menu extends Phaser.Scene {

    constructor() {
        super(Consts.MENU_SCENE);
    }

    create(data) {

        this.addMenuControls();

        this.music = this.sound.add(Sfx.BGM_MENU);
        //this.music.play({volume:.3, loop:true});

        GameSave.SetScore(0);

        Dom.AddClassToDomId(Consts.BOOT_CONTAINER, Consts.BOOT_LOGO_FADE);
        Dom.ResetClick(Consts.MAIN_PLAY_BUTTON);
        
        /**
        Dom.SetDomIdVisibility(Consts.MAIN_MENU, false);
        Dom.SetDomIdVisibility(Consts.MAIN_LOGO, false);
        Dom.SetDomIdVisibility(Consts.UI, true);
        Dom.SetDomIdVisibility(Consts.UI_PAUSE_BUTTON, true);
        Dom.SetDomIdVisibility(Consts.CHATBOX, true);
        Dom.SetDomIdVisibility(Consts.UI_WEAPON, true);
        this.scene.start(Consts.GAME_SCENE);
        /**/

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
            Dom.SetDomIdVisibility(Consts.MAIN_MENU, false);
            Dom.SetDomIdVisibility(Consts.MAIN_LOGO, false);
            Dom.SetDomIdVisibility(Consts.UI, true);
            Dom.SetDomIdVisibility(Consts.CHATBOX, true);
            Dom.SetDomIdVisibility(Consts.UI_PAUSE_BUTTON, true);
            Dom.SetDomIdVisibility(Consts.UI_WEAPON, true);
            Dom.ResetClick(Consts.MAIN_PLAY_BUTTON);

            this.scene.start(Consts.GAME_SCENE);
            this.sound.play(Sfx.MENU_PLAY_BUTTON, {volume: .5});
        });

        Dom.AddClick(Consts.INFO_BUTTON, ()=>{
            Dom.ToggleDomIdVisibility(Consts.INFO_BOX);
        });

        Dom.AddClick(Consts.HOW_TO_BUTTON, ()=>{
            Dom.ToggleDomIdVisibility(Consts.HOW_TO_BOX);
        });

        this.events.on('shutdown', ()=>{
            this.music.stop();
            this.music.destroy();
        }, this);
    }

    addMenuControls() {

        let elems = document.querySelectorAll(`.${Consts.MENU_MAIN_CLASS}`);
        for (let elem of elems)
            elem.addEventListener('click', selectMenuElement, false);

        this.input.keyboard.on('keydown-LEFT', (event) => {
            hideMenuElements();
            moveMenuElement(Consts.MENU_MAIN_SELECTED, -1);
        });
        this.input.keyboard.on('keydown-RIGHT', (event) => {
            hideMenuElements();
            moveMenuElement(Consts.MENU_MAIN_SELECTED, 1);
        });
        this.input.keyboard.on('keydown-DOWN', (event) => {
            hideMenuElements();
        });

        this.input.keyboard.on('keydown-UP', (event) => {
            selectedMenuElementAction(Consts.MENU_MAIN_SELECTED);
        });
        this.input.keyboard.on('keydown-ENTER', (event) => {
            selectedMenuElementAction(Consts.MENU_MAIN_SELECTED);
        });
        this.input.keyboard.on('keydown-SPACEBAR', (event) => {
            selectedMenuElementAction(Consts.MENU_MAIN_SELECTED);
        });
    }
}
export default Menu;