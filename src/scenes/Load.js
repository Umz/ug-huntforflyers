import GameSave from "../components/GameSave";
import Consts from "../consts/Consts";
import Levels from "../consts/Levels";
import Textures from "../consts/Textures";
import WorldConsts from "../consts/WorldConsts";

class Load extends Phaser.Scene {

    constructor() {
        super(Consts.LOAD_SCENE);
    }

    create(data) {

        let cover = this.add.image(0, 0, Textures.BLACK_SQUARE).setDisplaySize(WorldConsts.WIDTH, WorldConsts.HEIGHT).setOrigin(0);
        let nextScene = data.nextScene || Consts.GAME_SCENE;
        let fromScene = data.fromScene || Consts.GAME_SCENE;

        DomHandler.SetDomIdDisplay(Consts.MENU_BG, false);

        let timeline = this.tweens.createTimeline();
        timeline.add({
            targets: cover,
            alpha: {start: 0, from:0, to:1},
            duration: 500,
            onComplete: ()=>{
                this.scene.stop(fromScene);
            }
        });
        timeline.add({
            targets: cover,
            alpha: {from:1, to:1},
            duration: 500,
            onComplete: ()=>{
                GameSave.SetStage(Levels.STAGE2);
                this.scene.launch(nextScene);
            }
        });
        timeline.add({
            targets: cover,
            alpha: {from:1, to:0},
            duration: 500,
            onComplete: ()=>{
                this.scene.stop();
            }
            //var element = document.getElementById("myElement");
            //element.style.opacity = "0.2";
        });
        timeline.play();

    } 
};
export default Load;