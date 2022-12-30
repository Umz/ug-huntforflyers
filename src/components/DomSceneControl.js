import Consts from "../consts/Consts";
import Dom from "./Dom";

class DomSceneControl {

    static SetGameSceneControl(scene) {

        //  GUI
        Dom.AddClick(Consts.UI_PAUSE_BUTTON, ()=> {
            Dom.SetDomIdDisplay(Consts.UI, false);
            Dom.SetDomIdDisplay(Consts.MENU_BG, true);
            Dom.SetDomIdDisplay(Consts.PAUSE_MENU, true);
            scene.scene.pause();
        });

        //  PAUSE MENU

        Dom.AddClick(Consts.PAUSE_PLAY_BUTTON, ()=> {
            Dom.SetDomIdDisplay(Consts.UI, true);
            Dom.SetDomIdDisplay(Consts.MENU_BG, false);
            Dom.SetDomIdDisplay(Consts.PAUSE_MENU, false);
            scene.scene.resume();
        });

        Dom.AddClick(Consts.PAUSE_HOME_BUTTON, ()=> {
            Dom.SetDomIdDisplay(Consts.MENU_BG, false);
            Dom.SetDomIdDisplay(Consts.PAUSE_MENU, false);
            Dom.ResetClicks(Consts.SC_GAME_BUTTONS);

            Dom.SetDomIdDisplay(Consts.MAIN_MENU, true);
            Dom.SetDomIdDisplay(Consts.MAIN_LOGO, true);

            scene.scene.start(Consts.MENU_SCENE);
        });

        Dom.AddClick(Consts.PAUSE_SOUND_BUTTON, ()=> {
            Dom.SetDomIdDisplay(Consts.PAUSE_MENU, false);
            Dom.SetDomIdDisplay(Consts.RESULTS_MENU, true);
        });

        //  RESULTS / GAME OVER

        Dom.AddClick(Consts.RESULTS_HOME_BUTTON, ()=>{
            Dom.SetDomIdDisplay(Consts.MENU_BG, false);
            Dom.SetDomIdDisplay(Consts.RESULTS_MENU, false);
            Dom.ResetClicks(Consts.SC_GAME_BUTTONS);

            Dom.SetDomIdDisplay(Consts.MAIN_MENU, true);
            Dom.SetDomIdDisplay(Consts.MAIN_LOGO, true);

            scene.scene.start(Consts.MENU_SCENE);
        });
    }
}
export default DomSceneControl;