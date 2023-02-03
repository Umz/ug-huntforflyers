import GameSave from "../components/GameSave";
import Consts from "../consts/Consts";
import Dom from "../components/Dom";
import Levels from "../consts/Levels";
import Textures from "../consts/Textures";

class Load extends Phaser.Scene {

    constructor() {
        super(Consts.LOAD_SCENE);
    }

    create(data) {

        let cover = this.add.image(0, 0, Textures.BLACK_SQUARE).setVisible(false);
        let nextScene = data.nextScene || Consts.GAME_SCENE;
        let fromScene = data.fromScene || Consts.GAME_SCENE;
        let stageData = data.stageData || Levels.STAGE1;

        Dom.SetDomIdOpacity(Consts.LOADING, 0);
        Dom.SetDomIdVisibility(Consts.LOADING, true);

        let timeline = this.tweens.createTimeline();
        timeline.add({
            targets: cover,
            alpha: {start: 0, from:0, to:1},
            duration: 500,
            onUpdate: ()=>{
                Dom.SetDomIdOpacity(Consts.LOADING, cover.alpha);
            },
            onComplete: ()=>{
                this.scene.stop(fromScene);
            }
        });
        timeline.add({
            targets: cover,
            alpha: {from:1, to:1},
            duration: 500,
            onComplete: ()=>{
                GameSave.SetStage(stageData);
                this.scene.launch(nextScene);
            }
        });
        timeline.add({
            targets: cover,
            alpha: {from:1, to:0},
            duration: 500,
            onUpdate: ()=>{
                Dom.SetDomIdOpacity(Consts.LOADING, cover.alpha);
            },
            onComplete: ()=>{
                Dom.SetDomIdVisibility(Consts.LOADING, false);
                Dom.SetDomIdOpacity(Consts.LOADING, .4);
                this.scene.stop();
            }
        });
        timeline.play();

    } 
};
export default Load;