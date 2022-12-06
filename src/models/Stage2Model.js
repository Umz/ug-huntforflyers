import Buildings from "../consts/Buildings";
import Depths from "../consts/Depths";
import Building from "../classes/Building";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import BugModel from "./BugModel";

const Stage2Model = {

    LENGTHS: 1,
    TILES: 20,

    BIRD_MAIN: BugModel,
    BIRD_OTHERS: [],
    ENEMIES: [],
    
    BUILDINGS: [],

    FORESTS: [
        Forest.New().setTileX(6).setSize(6)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2)
    ]
}
export default Stage2Model;