import Buildings from "../consts/Buildings.";

const TextureRegistry = {
    atlas: new Map()
}

TextureRegistry.atlas.set(Buildings.LAB_TABLE, 'background');
TextureRegistry.atlas.set(Buildings.PLAYER_HOUSE, 'background');
TextureRegistry.atlas.set(Buildings.WATER_PUMP, 'background');

export default TextureRegistry;