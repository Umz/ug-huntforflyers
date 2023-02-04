const Actions = {

    ACT_CHAIN: "actionChain_",

    ACT_PREY_INIT: "initialMovementAfterSpawn",
    ACT_PREY_FLY: "keepFlyingInTheAir",
    ACT_PREY_LOCAL_X: "movingInTheLocalArea",

    ACT_STATE_CHANGE: "listenForChangeInState",
    ACT_CARRY_ROCKET: "carryRocket",

    ACT_WAIT: "controlActionWait",
    ACT_BLANK: "controlActionBlankDoNothing",
    ACT_MOVE_TO_X: "controlActionMoveToXPoisition",
    ACT_MOVE_TO_TARGET_X: "controlActionMoveToTargetXPosition",
    ACT_ENEMY_FLY: "controlActionFly",
    ACT_ENEMY_STEAL: "controlActionStealFrozenFlyAway",
    ACT_ENEMY_DIVE: "controlActionStealDive",
    ACT_FOLLOW_TARGET: "controlActionFollowTarget",
    
    ACT_LISTEN_FOR_FROZEN: "controlActionListenToFrozen",
    ACT_FIND_COINS: "coinerGoingToStealCoins",
    ACT_STEAL_COINS: "coinerReturningWithOrWithoutCoins",

    ACT_MOVE_TO_COLLECT: "collectorToPreyX",
    ACT_CARRY_PREY_HOME: "collectorCarryPreyHome",

    ACT_NO_ACTIONS: "controllerHasNoActiveActions",

    VIEW_FACE_DIRECTION: "faceMovementDirection",
    VIEW_COLLECTOR_ANIMATION: "collectorAnimation",
    VIEW_RUN_IDLE: "playRunOrIdleAnimation",
    VIEW_RUN_STOP: "playRunOrStopAnimation",
    VIEW_SPARKLE: "flashAndEmitter"
}
export default Actions;