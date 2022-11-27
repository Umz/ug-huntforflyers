import Levels from "../consts/Levels";
import WorldConsts from "../consts/WorldConsts";
import HomeLevelModel from "../levels/HomeLevelModel";

class LevelRegistry {

    static GetLevelData(levelID) {

        const MAP = new Map();
        MAP.set(Levels.HOME_1, HomeLevelModel);

        let model = MAP.get(levelID) ? MAP.get(levelID) : HomeLevelModel;
        return model;
    }
}
export default LevelRegistry;