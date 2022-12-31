import Consts from "../consts/Consts";
import Levels from "../consts/Levels";

class GameSave {

    static Init() {
        sessionStorage.setItem(Consts.SAVE_NAME, "-");
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, 0);
        sessionStorage.setItem(Consts.SAVE_STAGE, Levels.STAGE5);
    }

    static SetScore(val) {
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, val);
    }

    static IncScore(amt) {
        let score = this.GetScore();
        this.SetScore(score + amt);
    }

    static GetScore() {
        let str = sessionStorage.getItem(Consts.SAVE_NAME_SCORE);
        return parseInt(str);
    }

    static SetStage(stage) {
        sessionStorage.setItem(Consts.SAVE_STAGE, stage);
    }

    static GetStage() {
        return sessionStorage.getItem(Consts.SAVE_STAGE) || Levels.STAGE1;
    }
}
export default GameSave;