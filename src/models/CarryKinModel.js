import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const CarryKinModel = Object.assign({}, BaseModel);

CarryKinModel.relativeSpeed = .7;
CarryKinModel.atlas = 'sprites';
CarryKinModel.frame = 'spr_ck_idle1';
CarryKinModel.animation = Animations.CK_IDLE;

CarryKinModel.idle = Animations.CK_IDLE;
CarryKinModel.run = Animations.CK_RUN;
CarryKinModel.hold = Animations.CK_HOLD;
CarryKinModel.carry = Animations.CK_CARRY;

export default CarryKinModel;