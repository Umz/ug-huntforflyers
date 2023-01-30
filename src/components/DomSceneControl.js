import Consts from "../consts/Consts";
import Dom from "./Dom";

class DomSceneControl {

    static SetGameSceneControl(scene) {

        //  GUI
        Dom.AddClick(Consts.UI_PAUSE_BUTTON, ()=> {
            Dom.SetDomIdVisibility(Consts.UI, false);
            Dom.SetDomIdVisibility(Consts.MENU_BG, true);
            Dom.SetDomIdVisibility(Consts.PAUSE_MENU, true);
            scene.scene.pause();
        });

        //  PAUSE MENU

        Dom.AddClick(Consts.PAUSE_PLAY_BUTTON, ()=> {
            Dom.SetDomIdVisibility(Consts.UI, true);
            Dom.SetDomIdVisibility(Consts.MENU_BG, false);
            Dom.SetDomIdVisibility(Consts.PAUSE_MENU, false);
            scene.scene.resume();
        });

        Dom.AddClick(Consts.PAUSE_HOME_BUTTON, ()=> {
            Dom.SetDomIdVisibility(Consts.MENU_BG, false);
            Dom.SetDomIdVisibility(Consts.PAUSE_MENU, false);
            Dom.ResetClicks(Consts.SC_GAME_BUTTONS);

            Dom.SetDomIdVisibility(Consts.MAIN_MENU, true);
            Dom.SetDomIdVisibility(Consts.MAIN_LOGO, true);

            scene.scene.start(Consts.MENU_SCENE);
        });

        Dom.AddClick(Consts.PAUSE_SOUND_BUTTON, ()=> {
            Dom.SetDomIdVisibility(Consts.PAUSE_MENU, false);
            Dom.SetDomIdVisibility(Consts.RESULTS_MENU, true);
        });

        //  RESULTS / GAME OVER

        Dom.AddClick(Consts.RESULTS_HOME_BUTTON, ()=>{
            Dom.SetDomIdVisibility(Consts.MENU_BG, false);
            Dom.SetDomIdVisibility(Consts.RESULTS_MENU, false);
            Dom.ResetClicks(Consts.SC_GAME_BUTTONS);

            Dom.SetDomIdVisibility(Consts.MAIN_MENU, true);
            Dom.SetDomIdVisibility(Consts.MAIN_LOGO, true);

            scene.scene.start(Consts.MENU_SCENE);
        });
    }
}
export default DomSceneControl;