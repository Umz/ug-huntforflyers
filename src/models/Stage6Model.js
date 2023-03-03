import Building from "classes/Building";
import Buildings from "consts/Buildings";
import Decor from "consts/Decor";
import Depths from "consts/Depths";
import Forest from "classes/Forest";
import PlantType from "consts/PlantType";
import BatModel from "./BatModel";
import BeeModel from "./BeeModel";
import Characters from "../consts/Characters";
import BlueBirdModel from "./BlueBirdModel";
import RedBirdModel from "./RedBirdModel";
import Signage from "../consts/Signage";

const Stage6Model = {

    LENGTHS: 7,
    CARRYKINS: 10,

    ENEMIES: [],

    // (Shopping district right | Residential crisis left)
    
    BUILDINGS: [
        Building.New(Buildings.PLAYER_HOUSE).setTileX(80).setDepth(Depths.BUILDINGS_BG).setAlpha(.1),

        // 0 - 20 (Heavy Huts - Residential crisis)

        Building.New(Buildings.TENT1).setTileX(2).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.TENT1).setTileX(3).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.TENT2).setTileX(4).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(5).setDepth(Depths.BUILDINGS_FG),

        Building.New(Buildings.TENT3).setTileX(6).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(8.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.TENT2).setTileX(8).setDepth(Depths.BUILDINGS_FG).setComplete(1),
        Building.New(Buildings.TENT2).setTileX(9.5).setDepth(Depths.BUILDINGS_FG).setComplete(1),
        Building.New(Buildings.TENT2).setTileX(10).setDepth(Depths.BUILDINGS_BG),
        
        Building.New(Buildings.HUT).setTileX(12).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(13.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.FARMHUT).setTileX(15.5).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Decor.SIGN).setTileX(15).setDepth(Depths.DECOR_FG).setSign(Signage.LV5_LEFT),

        // 20 - 40 - Rehousing efforts (BIG)

        Building.New(Buildings.HOUSE2).setTileX(22).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(23.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(25).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(26.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE2).setTileX(28).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(29.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(31).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(32.5).setDepth(Depths.BUILDINGS_BG),
        
        // 40 - 60 - Shopping and recreation
        
        Building.New(Buildings.SHOP).setTileX(40).setDepth(Depths.BUILDINGS_BG).setSign(Signage.THE_STORE),
        Building.New(Buildings.SHOP).setTileX(42).setDepth(Depths.BUILDINGS_BG).setSign(Signage.THE_STORE),
        Building.New(Buildings.STORE).setTileX(46).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.STORE).setTileX(49).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.SHOP).setTileX(51).setDepth(Depths.BUILDINGS_BG).setSign(Signage.THE_STORE),

        // 60 - 80 - Player among huts and Lab workers

        Building.New(Buildings.TENT3).setTileX(60).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(61.5).setDepth(Depths.BUILDINGS_BG),
        
        Building.New(Buildings.LAB_TABLE).setTileX(63).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(65).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POST).setTileX(67).setDepth(Depths.DECOR_FG),
        Building.New(Buildings.WATER_PUMP).setTileX(70).setDepth(Depths.BUILDINGS_FG),

        Building.New(Buildings.TENT3).setTileX(74).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POD).setTileX(75).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.POD).setTileX(76.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.PUB).setTileX(76).setDepth(Depths.BUILDINGS_BG).setSign(Signage.THE_PUB),

        // 80 - 100 - shopping and housing

        Building.New(Buildings.SHOP).setTileX(80).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.SHOP).setTileX(82).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.STORE).setTileX(84).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.HOUSE2).setTileX(90).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(91.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(93).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(94.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(96).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BENCH).setTileX(97.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BENCH).setTileX(98.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BBQ).setTileX(100).setDepth(Depths.DECOR_FG),

        // 100 - 120 - Masjid

        Building.New(Buildings.MOSQUE).setTileX(110).setDepth(Depths.BUILDINGS_BG).setComplete(1),

        Building.New(Decor.BARREL).setTileX(108).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(108.5).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BARREL).setTileX(111.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(112).setDepth(Depths.DECOR_FG),

        // 120 - 140 - Farming

        Building.New(Buildings.WINDMILL).setTileX(123).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.FARMHUT).setTileX(130).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.HANGING_SIGN).setTileX(124).setDepth(Depths.DECOR_FG).setSign("Farm"),
    ],

    FORESTS: [

        Forest.New().setTileX(0).setSize(4)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(16).setSize(6).setEnemy(BatModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.BUSH, PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        //  30+ Park

        Forest.New().setTileX(34).setSize(4)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        Forest.New().setTileX(42).setSize(4).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(52).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3),

        Forest.New().setTileX(52).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3),

        //  80+ Around Drinking Spot

        Forest.New().setTileX(74).setSize(6)
            .addLayer([PlantType.BUSH], Depths.BUILDINGS_BEHIND),
        Forest.New().setTileX(77).setSize(2)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG1),

        Forest.New().setTileX(84).setSize(4)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG3),

        Forest.New().setTileX(86).setSize(3)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG1),

        //  100 - 120 Masjid

        Forest.New().setTileX(102).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        Forest.New().setTileX(104).setSize(12)
            .addLayer([PlantType.TREE3, PlantType.TREE3_RED], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(103.5).setSize(3).setEnemy(RedBirdModel)
            .addLayer([ PlantType.TREE3_YELLOW], Depths.FOREST_BG3),
        Forest.New().setTileX(113.5).setSize(3).setEnemy(RedBirdModel)
            .addLayer([ PlantType.TREE3_YELLOW], Depths.FOREST_BG3),

        Forest.New().setTileX(111).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        //  120 - Farmland

        Forest.New().setTileX(120).setSize(10)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_BG3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(125).setSize(10)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_BG3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(130).setSize(10)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_BG3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(131).setSize(2).setEnemy(BatModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
    ]
}
export default Stage6Model;