import Animations from "consts/Animations";
import BaseModel from "consts/BaseModel";

const SkyBomberModel = Object.assign({}, BaseModel);

SkyBomberModel.hp = 5;
SkyBomberModel.relativeSpeed = 1.8;
SkyBomberModel.atlas = 'sprites';
SkyBomberModel.frame = 'skybomber1';

SkyBomberModel.idle = Animations.SKY_BOMBER;

export default SkyBomberModel;