import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const PaleKinModel = Object.assign({}, BaseModel);

PaleKinModel.relativeSpeed = .75;
PaleKinModel.atlas = 'sprites';
PaleKinModel.frame = 'spr_pk_idle1';

PaleKinModel.idle = Animations.PK_IDLE;
PaleKinModel.run = Animations.PK_RUN;

export default PaleKinModel;