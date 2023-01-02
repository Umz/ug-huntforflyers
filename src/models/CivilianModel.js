import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const CivilianModel = Object.assign({}, BaseModel);

CivilianModel.relativeSpeed = .35;
CivilianModel.atlas = 'sprites';
CivilianModel.frame = 'spr_muslim_idle1';

//CivilianModel.idle = Animations.MUSLIM_IDLE;
//CivilianModel.run = Animations.MUSLIM_RUN;
CivilianModel.idle = Animations.MUSLIMA_IDLE;
CivilianModel.run = Animations.MUSLIMA_RUN;

export default CivilianModel;