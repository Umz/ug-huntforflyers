import Levels from "../consts/Levels";
import WorldConsts from "../consts/WorldConsts";
import HomeLevelModel from "../levels/HomeLevelModel";

class LevelRegistry {

    static GetLevelData(levelID) {

        const MAP = new Map();
        MAP.set(Levels.HOME_1, HomeLevelModel);

        const MODEL = MAP.get(levelID) ? MAP.get(levelID) : HomeLevelModel;
        const SCREEN_WIDTH = WorldConsts.WIDTH;
        const TILEWIDTH = Math.ceil(SCREEN_WIDTH / MODEL.TILES);

        let transformArray = (typeArray) => {
            typeArray.forEach(element => {
                element.worldX = (element.tile * TILEWIDTH);
            });
            return typeArray;
        }

        let data = {
            width: (MODEL.LENGTHS * SCREEN_WIDTH),
            buildings: transformArray(MODEL.BUILDINGS),
            forests: transformArray(MODEL.FORESTS),
        }

        return data;
    }
}
export default LevelRegistry;