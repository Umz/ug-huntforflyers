import Building from "../classes/Building";
import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";
import Depths from "../consts/Depths";
import Forest from "../classes/Forest";
import PlantType from "../consts/PlantType";
import Characters from "../consts/Characters";
import BeeModel from "./BeeModel";
import BlueBirdModel from "./BlueBirdModel";
import RedBirdModel from "./RedBirdModel";

const Stage5Model = {

    LENGTHS: 5,
    CARRYKINS: 11,
    ENEMIES: [
        Characters.DRONE,
        Characters.BOMBER,
        Characters.PIP
    ],
    
    BUILDINGS: [
        
        //  Slums 0 - 20

        Building.New(Buildings.TENT1).setTileX(7).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(8).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(9).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(8.5).setDepth(Depths.BUILDINGS_FG).setComplete(1),
        Building.New(Buildings.TENT1).setTileX(9.5).setDepth(Depths.BUILDINGS_FG).setComplete(1),

        Building.New(Buildings.TENT2).setTileX(10).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(11.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.TENT3).setTileX(13).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(15.5).setDepth(Depths.BUILDINGS_FG).setComplete(1),
        Building.New(Decor.SIGN).setTileX(15).setDepth(Depths.DECOR_FG),

        //  Houses with Park 20 - 40

        Building.New(Decor.FENCE2).setTileX(21).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(22).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(23).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(24).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),

        Building.New(Decor.FENCE2).setTileX(20.5).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.FENCE2).setTileX(24.5).setDepth(Depths.BUILDINGS_FG),

        Building.New(Decor.WATER).setTileX(21.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.WATER).setTileX(22.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.WATER).setTileX(23.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BARREL).setTileX(21.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(22).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(22.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(23).setDepth(Depths.DECOR_FG),

        Building.New(Decor.CHEST).setTileX(25.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(26.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Buildings.HUT).setTileX(27).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(28.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(35).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.HUT).setTileX(36.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BENCH).setTileX(30).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BENCH).setTileX(30.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BBQ).setTileX(32).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BENCH).setTileX(33).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.HANGING_SIGN).setTileX(39).setDepth(Depths.DECOR_FG),

        //  Player area 40 - 60
        
        Building.New(Decor.FENCE).setTileX(41.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE2).setTileX(42).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.FENCE2).setTileX(42).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(43).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(44).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(45).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(46).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(47).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(48).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(49).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        
        Building.New(Buildings.LAB_TABLE).setTileX(43.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(46).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POST).setTileX(47.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.FENCE).setTileX(49.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE2).setTileX(49).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.WATER).setTileX(53.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(54.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.WATER_PUMP).setTileX(53).setDepth(Depths.BUILDINGS_FG),
        
        Building.New(Decor.BARREL).setTileX(53).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(53.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(54).setDepth(Depths.DECOR_FG),

        //  Shops 60 - 80
        
        Building.New(Decor.POD).setTileX(61).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.POD).setTileX(62.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.PUB).setTileX(62).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.PURPLE_CHEST).setTileX(62.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(63).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(63.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Buildings.HOUSE1).setTileX(65.5).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.SHOP).setTileX(67).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.HOUSE1).setTileX(69).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(71).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POT).setTileX(72).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.CHEST).setTileX(68).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BBQ).setTileX(68.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.FENCE2).setTileX(74).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(75).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(76).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(77).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(73.5).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.FENCE2).setTileX(77.5).setDepth(Depths.BUILDINGS_FG),
        
        Building.New(Decor.WATER).setTileX(74.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.WATER).setTileX(75.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.WATER).setTileX(76.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BARREL).setTileX(74.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(75).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HUT).setTileX(80).setDepth(Depths.BUILDINGS_BG),

        //  Mosque Space 80 - 100

        Building.New(Decor.BARREL).setTileX(83).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(83.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(84.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.WATER).setTileX(89.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(90.5).setDepth(Depths.BUILDINGS_BEHIND),

        Building.New(Decor.BARREL).setTileX(95).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(95.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(96).setDepth(Depths.DECOR_FG),
    ],

    FORESTS: [

        Forest.New().setTileX(1).setSize(5)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2], Depths.FOREST_BG3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2], Depths.FOREST_FG2)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2], Depths.FOREST_FG2),

        Forest.New().setTileX(0).setSize(6)
            .addLayer([PlantType.SUNFLOWER], Depths.FOREST_FG1),

        Forest.New().setTileX(5).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(14).setSize(6)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(17).setSize(2).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(29).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3),
        Forest.New().setTileX(29).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3),
        Forest.New().setTileX(29).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3),

        Forest.New().setTileX(28).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),
        Forest.New().setTileX(34).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(47).setSize(4)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(41).setSize(4)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(56).setSize(5)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG1),

        Forest.New().setTileX(58).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(63).setSize(5).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(70).setSize(5)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(82).setSize(4)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(82).setSize(4)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        Forest.New().setTileX(88).setSize(4).setEnemy(RedBirdModel)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1], Depths.FOREST_FG1),

        Forest.New().setTileX(93).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(93).setSize(5)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_BG3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
    ]
}
export default Stage5Model;