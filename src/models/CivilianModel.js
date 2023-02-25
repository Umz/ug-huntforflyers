import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const CivilianModel = Object.assign({}, BaseModel);

CivilianModel.relativeSpeed = .35;
CivilianModel.atlas = 'sprites';
CivilianModel.frame = 'spr_muslim_idle1';

CivilianModel.idle = Animations.MUSLIM_IDLE;
CivilianModel.run = Animations.MUSLIM_RUN;

CivilianModel.skins = {

    male: {
        muslim1: {
            idle: Animations.MUSLIM_IDLE,
            run: Animations.MUSLIM_RUN
        }
    },

    female: {
        muslim1: {
            idle: Animations.MUSLIMA_IDLE,
            run: Animations.MUSLIMA_RUN
        },
        muslim2: {
            idle: Animations.MUSLIMA2_IDLE,
            run: Animations.MUSLIMA2_RUN
        }
    },

    kins: {
        greencap: {
            idle: Animations.GREENCAP_IDLE,
            run: Animations.GREENCAP_RUN
        }
    }
}

export default CivilianModel;