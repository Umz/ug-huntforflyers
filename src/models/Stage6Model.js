import Depths from "../consts/Depths";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import FairyModel from "./FairyModel";

const Stage3Model = {

    LENGTHS: 2,
    TILES: 20,

    BIRD_MAIN: FairyModel,
    BIRD_OTHERS: [],
    ENEMIES: [],
    
    BUILDINGS: [],

    FORESTS: [
        Forest.New().setTileX(3).setSize(5)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),

        Forest.New().setTileX(15).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2)
    ]
}
export default Stage3Model;