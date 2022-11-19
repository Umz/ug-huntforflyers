import Consts from "../consts/Consts";

class GameSave {

    static Init() {
        sessionStorage.setItem(Consts.SAVE_NAME, "-");
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, 0);
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
}
export default GameSave;