const Consts = {

    BOOT_SCENE: 'Boot',
    PRELOAD_SCENE: 'Preload',
    MENU_SCENE: "Menu",
    GAME_SCENE: "Game",
    LOAD_SCENE: "Load",

    BOOT_CONTAINER: "boot-container",
    BOOT_LOGO_FADE: "boot-fade-out",

    LOADING: "loading-container",
    LOADING_ANIM: "loading-fading",

    MENU_MAIN_CLASS: "title-menu-option",
    MENU_MAIN_SELECTED: "title-menu-selected",

    MAIN_MENU: "title-menu-container",
    MAIN_LOGO: "game-logo",
    MAIN_PLAY_BUTTON: "menu-play",

    CHATBOX: "chatbox-container",
    // Refactor UIs to HUD
    UI: "stats-container",
    UI_PAUSE_BUTTON: "pause-container",
    UI_SCORE_TEXT: "hud-lifeforce-text",
    UI_WEAPON: "hud-weapon",

    HUD_WEAPON_TEXT: "wep-name",
    HUD_WEAPON_SELECT: "wep-select",
    HUD_WEAPON_ACTIVE: "wep-select-active",

    HUD_WEP_HUNTING: "wep-hunting",
    HUD_WEP_ATTACK: "wep-attack",
    HUD_WEP_COLLECT: "wep-collect",

    HUD_STAGE_TEXT: "hud-stage-text",
    HUD_CARRYKINS_TEXT: "hud-team-text",

    PAUSE_MENU: "game-pause-menu",
    PAUSE_PLAY_BUTTON: "pause-menu-play",
    PAUSE_HOME_BUTTON: "pause-menu-home",
    PAUSE_SOUND_BUTTON: "pause-menu-sound",

    RESULTS_MENU: "game-result-menu",
    RESULTS_HOME_BUTTON: "result-menu-home",

    SAVE_NAME: "hff_save_key_1",
    SAVE_NAME_SCORE: "hff_save_score_1",
    SAVE_STAGE: "hff_save_stage"
}
//  Shortcut
Consts.SC_GAME_BUTTONS =  [Consts.UI_PAUSE_BUTTON, Consts.PAUSE_PLAY_BUTTON, Consts.PAUSE_HOME_BUTTON, Consts.PAUSE_SOUND_BUTTON, Consts.RESULTS_HOME_BUTTON];
export default Consts;