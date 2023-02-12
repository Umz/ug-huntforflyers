import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const CloneModel = Object.assign({}, BaseModel);

CloneModel.relativeSpeed = .45;
CloneModel.atlas = 'sprites';
CloneModel.frame = 'spr_tolu_idle1';

CloneModel.idle = Animations.TOLU_IDLE;
CloneModel.run = Animations.TOLU_RUN;

export default CloneModel;