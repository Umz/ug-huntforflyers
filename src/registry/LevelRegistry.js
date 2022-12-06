import Levels from "../consts/Levels";
import Stage1Model from "../models/Stage1Model";
import Stage2Model from "../models/Stage2Model";
import Stage3Model from "../models/Stage3Model";

class LevelRegistry {

    static GetLevelData(levelID) {

        const MAP = new Map();
        MAP.set(Levels.STAGE1, Stage1Model);
        MAP.set(Levels.STAGE2, Stage2Model);
        MAP.set(Levels.STAGE3, Stage3Model);

        let model = MAP.get(levelID) ? MAP.get(levelID) : Stage1Model;
        return model;
    }
}
export default LevelRegistry;