import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";
import PlantType from "../consts/PlantType";

const TextureMapper = {
    atlas: new Map(),
    getAtlas: (frame) => this.a.atlas.get(frame)    // No idea what 'this.a' is?
}

for (let building in Buildings)
    TextureMapper.atlas.set(Buildings[building], 'background');

for (let decor in Decor)
    TextureMapper.atlas.set(Decor[decor], 'background');

for (let plant in PlantType)
    TextureMapper.atlas.set(Decor[plant], 'background');

export default TextureMapper;