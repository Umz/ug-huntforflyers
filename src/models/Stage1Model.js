import Buildings from "../consts/Buildings";
import Depths from "../consts/Depths";
import Building from "../classes/Building";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import BeeModel from "./BeeModel";

const Stage1Model = {

    LENGTHS: 1,
    ENEMIES: [],
    
    BUILDINGS: [
        Building.New(Buildings.LAB_TABLE).setTileX(4).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(6).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(8).setDepth(Depths.BUILDINGS_FG)
    ],

    FORESTS: [
        Forest.New().setTileX(14).setSize(4).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2)
    ]
}
export default Stage1Model;