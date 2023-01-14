import Building from "classes/Building";
import Buildings from "consts/Buildings";
import Decor from "consts/Decor";
import Depths from "consts/Depths";
import Forest from "classes/Forest";
import PlantType from "consts/PlantType";
import BatModel from "./BatModel";
import BeeModel from "./BeeModel";

const Stage6Model = {

    LENGTHS: 7,
    ENEMIES: [],

    //140
    BUILDINGS: [

        //  Slums

        Building.New(Buildings.TENT1).setTileX(2).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(3).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(4).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(6).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(8).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.TENT3).setTileX(12).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(14).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.HOUSE1).setTileX(29).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(32).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(35).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE2).setTileX(40).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE2).setTileX(45).setDepth(Depths.BUILDINGS_BG),

        
        Building.New(Buildings.LAB_TABLE).setTileX(60).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(62).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(66).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.POST).setTileX(63).setDepth(Depths.DECOR_FG),

        //  Houses, shops, houses
        Building.New(Buildings.SHOP).setTileX(77).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.STORE).setTileX(80).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.HOUSE1).setTileX(84).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(87).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.HUT).setTileX(91).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.FARMHUT).setTileX(93).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.MOSQUE).setTileX(103).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.FARMHUT).setTileX(123).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WINDMILL).setTileX(125).setDepth(Depths.BUILDINGS_BG),
    ],

    FORESTS: [
        Forest.New().setTileX(55).setSize(12)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(95).setSize(18)
            .addLayer([PlantType.SUNFLOWER], Depths.FOREST_FG1),
        Forest.New().setTileX(95).setSize(18)
            .addLayer([PlantType.SUNFLOWER], Depths.FOREST_FG1),
        Forest.New().setTileX(95.5).setSize(18)
            .addLayer([PlantType.SUNFLOWER], Depths.FOREST_FG1),

        Forest.New().setTileX(100).setSize(2).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(115).setSize(5).setEnemy(BatModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(120).setSize(6)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(126).setSize(10)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),
        Forest.New().setTileX(126.5).setSize(10)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),
        Forest.New().setTileX(127).setSize(10)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(135).setSize(7)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),
    ]
}
export default Stage6Model;