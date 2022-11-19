import Buildings from "../consts/Buildings.";
import Flora from "../consts/Flora";

const HomeLevelModel = {

    LENGTHS: 1,     //  1 Length is 1 screen
    TILES: 20,      //  How many tiles in 1 length
    
    BUILDINGS: [
        //  Create LevelBuilding (Type) ? TypeScript style-
        {type:Buildings.LAB_TABLE, tile:5},
        {type:Buildings.PLAYER_HOUSE, tile:7},
        {type:Buildings.WATER_PUMP, tile:8},
    ],

    FORESTS: [
        {type: Flora.SIMPLE_FOREST, tile:14, size:4}
    ]
}
export default HomeLevelModel;