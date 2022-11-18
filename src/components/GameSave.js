import Consts from "../Consts";

class GameSave {

    static init() {
        sessionStorage.setItem(Consts.SAVE_NAME, "-");
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, 0);
    }

    static setScore(val) {
        sessionStorage.setItem(Consts.SAVE_NAME_SCORE, val);
    }

    static incScore(amt) {
        let score = this.getScore();
        this.setScore(score + amt);
    }

    static getScore() {
        let str = sessionStorage.getItem(Consts.SAVE_NAME_SCORE);
        return parseInt(str);
    }
}
export default GameSave;