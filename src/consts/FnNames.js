const FnNames = {
    CTRL_SPAWN_TO_NORMAL_STATE: "spawnStateToNormalState",
    CTRL_IS_ON_GROUND: "spriteIsTouchingGround",

    CTRL_FOLLOW_PLAYER: "collectorFollowPlayer",
    CTRL_TO_COLLECT: "collectorTowardsFrozenPrey",
    CTRL_CARRY_HOME: "collectorToCarryPreyHome",

    CTR_CIV_IDLE: "civilianIdleActionPicker",
    CTR_CIV_HOME: "civilianReturnHome",
    CTR_CIV_MOVE: "civilianMoveToX",
    CTR_CIV_WAIT: "civilianWaitForSomeTime",

    VIEW_SPAWN_TO_NORMAL_DEPTH: "spawnDepthToNormalDepth",
    VIEW_DIRECTION_FACING: "spriteFaceDirectionMoving",

    VIEw_COLLECTOR_FRAME: "collectorAnimations",

    ACT_WAIT: "controlActionWait",
    ACT_BLANK: "controlActionBlankDoNothing",
    ACT_MOVETOX: "controlActionMoveToXPoisition",
    ACT_MOVETOTARGETX: "controlActionMoveToTargetXPosition",
    ACT_ENEMY_FLY: "controlActionFly",
    ACT_ENEMY_STEAL: "controlActionStealFrozenFlyAway",
    ACT_ENEMY_DIVE: "controlActionStealDive",
    ACT_FOLLOW_TARGET: "controlActionFollowTarget",

    ACT_LISTENFORFROZEN: "controlActionListenToFrozen",

    ACT_FACEDIRECTION: "faceMovementDirection",
}
export default FnNames;