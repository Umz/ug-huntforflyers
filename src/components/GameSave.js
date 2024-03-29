import Consts from "consts/Consts";
import Levels from "consts/Levels";
import Dom from "./Dom";
import SaveData from "../classes/SaveData";

class GameSave {

    static Init() {
        sessionStorage.setItem(Consts.SAVE_NAME, "Replica #1");
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, 0);
        sessionStorage.setItem(Consts.SAVE_STAGE, Levels.STAGE1);
    }

    static GetSaveData() {
        
        let json = sessionStorage.getItem('save-data-test');
        let loadData = JSON.parse(json);

        let saveData = new SaveData();
        if (loadData)
            Object.assign(saveData, loadData);
            
        return saveData;
    }

    static SaveDataToLocal(data) {
        let json = JSON.stringify(data);
        sessionStorage.setItem('save-data-test', json);
    }

    static SetScore(val) {
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, val);
    }
    
    static GetScore() {
        let str = sessionStorage.getItem(Consts.SAVE_NAME_SCORE);
        return parseInt(str);
    }

    static IncScore(amt) {
        let score = this.GetScore();
        this.SetScore(score + amt);
    }

    static DecScore(amt) {
        let score = this.GetScore();
        let newScore = Math.max(score - amt, 0);
        this.SetScore(newScore);
        return score - newScore;
    }

    static UpdateScoreAndDom(val) {
        
        let amt = (val > 0) ?this.IncScore(val) : this.DecScore(Math.abs(val));
        Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
        return amt;
    }

    static SetStage(stage) {
        sessionStorage.setItem(Consts.SAVE_STAGE, stage);
    }

    static GetStage() {
        return sessionStorage.getItem(Consts.SAVE_STAGE) || Levels.STAGE1;
    }
}
export default GameSave;