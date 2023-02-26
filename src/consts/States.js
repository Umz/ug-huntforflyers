const States = {

    DEAD: -1,
    REMOVED: -2,

    IDLE: 0,
    JUST_SPAWNED: 1,
    NORMAL: 2,
    GENERAL: 3,

    FIRING: 5,

    FROZEN: 10,
    STOLEN: 11,
    CARRIED: 12,

    TO_COLLECT: 20,
    CARRYING: 21,

    CRASHING: 40,

    MODE_TANK: 101,
    MODE_HUNT: 102,
    MODE_CANNON: 103,
    
    MODE_KIN: 201,
    MODE_CARRYKIN: 202,
    MODE_PALEKIN: 203,
}
export default States;