import Levels from "../consts/Levels";
import Stage1Model from "../models/Stage1Model";
import Stage2Model from "../models/Stage2Model";
import Stage3Model from "../models/Stage3Model";
import Stage4Model from "../models/Stage4Model";
import Stage5Model from "../models/Stage5Model";
import Stage5MasjidModel from "../models/Stage5MasjidModel";
import Stage6Model from "../models/Stage6Model";

class LevelMapper {

    static GetLevelData(levelID) {

        const MAP = new Map();
        MAP.set(Levels.STAGE1, Stage1Model);
        MAP.set(Levels.STAGE2, Stage2Model);
        MAP.set(Levels.STAGE3, Stage3Model);
        MAP.set(Levels.STAGE4, Stage4Model);
        MAP.set(Levels.STAGE5, Stage5Model);
        MAP.set(Levels.STAGE6, Stage5MasjidModel);
        //MAP.set(Levels.STAGE6, Stage6Model);

        let model = MAP.get(levelID) ? MAP.get(levelID) : Stage1Model;
        return model;
    }
}
export default LevelMapper;