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

        Building.New(Decor.SIGN).setTileX(1).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(4.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT1).setTileX(3).setDepth(Depths.BUILDINGS_BG),
        
        Building.New(Buildings.PLAYER_HOUSE).setTileX(7).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.LAB_TABLE).setTileX(6).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(9).setDepth(Depths.BUILDINGS_FG),
        
        Building.New(Decor.BARREL).setTileX(10).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(10.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT1).setTileX(12).setDepth(Depths.BUILDINGS_BG),
        
        Building.New(Decor.SIGN).setTileX(18).setDepth(Depths.DECOR_FG),
    ],

    FORESTS: [

        Forest.New().setTileX(1).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(3).setSize(4)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(15).setSize(2).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1], Depths.FOREST_FG1),

        Forest.New().setTileX(14.5).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),

        Forest.New().setTileX(14).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
            
        Forest.New().setTileX(14).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2)
    ]
}
export default Stage1Model;