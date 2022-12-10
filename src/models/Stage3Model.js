import Depths from "../consts/Depths";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import BugModel from "./BugModel";
import Building from "../classes/Building";
import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";

const Stage3Model = {

    LENGTHS: 3,
    ENEMIES: [],
    
    BUILDINGS: [

        Building.New(Buildings.LAB_TABLE).setTileX(27).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(29).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(33).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.POST).setTileX(30).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT1).setTileX(1).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(2).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.BARREL).setTileX(.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.SIGN).setTileX(3).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT2).setTileX(18).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(18.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.BARREL).setTileX(16).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(16.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(17).setDepth(Depths.DECOR_FG),

        Building.New(Decor.SIGN).setTileX(20).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(21).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(21.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(22).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(23).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BARREL).setTileX(32).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(34).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(35).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(35.5).setDepth(Depths.DECOR_FG),

        Building.New(Decor.SIGN).setTileX(37).setDepth(Depths.DECOR_FG),
        Building.New(Buildings.TENT3).setTileX(41).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(43).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(45).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.CHEST).setTileX(46).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(46.5).setDepth(Depths.DECOR_FG),
    ],

    FORESTS: [

        Forest.New().setTileX(5).setSize(5)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(10).setSize(5).setEnemy(BugModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),

        Forest.New().setTileX(38).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),
        Forest.New().setTileX(48).setSize(3).setEnemy(BugModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),
        Forest.New().setTileX(52).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(56).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),

        Forest.New().setTileX(40).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
    ]
}
export default Stage3Model;