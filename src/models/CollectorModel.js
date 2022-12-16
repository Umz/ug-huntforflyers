import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const CollectorModel = Object.assign({}, BaseModel);

CollectorModel.relativeSpeed = .7;
CollectorModel.atlas = 'sprites';
CollectorModel.frame = 'spr_ck_idle1';
CollectorModel.animation = Animations.CK_IDLE;

CollectorModel.idle = Animations.CK_IDLE;
CollectorModel.run = Animations.CK_RUN;
CollectorModel.hold = Animations.CK_HOLD;
CollectorModel.carry = Animations.CK_CARRY;

export default CollectorModel;