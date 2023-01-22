import Building from "classes/Building";
import Forest from "classes/Forest";
import Depths from "consts/Depths";
import PlantType from "consts/PlantType";
import Buildings from "consts/Buildings";
import Decor from "consts/Decor";
import BugModel from "./BugModel";

const Stage3Model = {

    LENGTHS: 3,
    ENEMIES: [],
    
    BUILDINGS: [

        Building.New(Decor.WATER).setTileX(10.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(11).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.POD).setTileX(25.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.LAB_TABLE).setTileX(25).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(29).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(33).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.POST).setTileX(30).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT3).setTileX(18).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(19.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.BARREL).setTileX(16).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(16.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(17).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BBQ).setTileX(21.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(22).setDepth(Depths.DECOR_FG),

        Building.New(Decor.WATER).setTileX(33.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.BARREL).setTileX(32).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(34).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(35).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(35.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HUT).setTileX(43).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(45).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(46).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.CHEST).setTileX(46).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(46.5).setDepth(Depths.DECOR_FG),
    ],

    FORESTS: [

        Forest.New().setTileX(0).setSize(5)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(.5).setSize(5)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(3).setSize(6)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(12).setSize(2).setEnemy(BugModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),

        Forest.New().setTileX(9).setSize(4)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(16).setSize(6)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(30).setSize(6)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(36).setSize(10)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(40).setSize(2).setEnemy(BugModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),

        Forest.New().setTileX(40).setSize(3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
        Forest.New().setTileX(40).setSize(3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),

        Forest.New().setTileX(48).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),

        Forest.New().setTileX(52).setSize(8)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG2)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG3)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG1),
    ]
}
export default Stage3Model;