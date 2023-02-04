import GameSave from "../components/GameSave";
import Consts from "../consts/Consts";
import Dom from "../components/Dom";
import Levels from "../consts/Levels";

class Load extends Phaser.Scene {

    constructor() {
        super(Consts.LOAD_SCENE);
    }

    create(data) {

        let nextScene = data.nextScene || Consts.GAME_SCENE;
        let fromScene = data.fromScene || Consts.GAME_SCENE;
        let stageData = data.stageData || Levels.STAGE1;

        let loadTime = 4000;
        let transition = loadTime / 2;

        Dom.SetDomIdVisibility(Consts.LOADING, true);
        Dom.AddClassToDomId(Consts.LOADING, Consts.LOADING_ANIM);

        this.time.addEvent({
            delay: transition,
            callback: ()=>{
                GameSave.SetStage(stageData);
                Dom.ClearChatBox();
                this.scene.stop(fromScene);
                this.scene.launch(nextScene);
            }
        });

        this.time.addEvent({
            delay: loadTime,
            callback: ()=>{
                Dom.SetDomIdVisibility(Consts.LOADING, false);
                Dom.RemoveClassFromDomById(Consts.LOADING, Consts.LOADING_ANIM);
                this.scene.stop();
            }
        });
    } 
};
export default Load;