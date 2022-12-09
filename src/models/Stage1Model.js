import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";
import Depths from "../consts/Depths";
import Building from "../classes/Building";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import BeeModel from "./BeeModel";

const Stage1Model = {

    LENGTHS: 1,
    ENEMIES: [],
    
    BUILDINGS: [
        Building.New(Buildings.LAB_TABLE).setTileX(5.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(6.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(8.5).setDepth(Depths.BUILDINGS_FG),

        Building.New(Decor.CHEST).setTileX(14).setDepth(Depths.DECOR_FG),

        Building.New(Decor.SIGN).setTileX(3).setDepth(Depths.DECOR_FG),
    ],

    FORESTS: [

        Forest.New().setTileX(1).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(15).setSize(3).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),

        Forest.New().setTileX(13).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2)
    ]
}
export default Stage1Model;