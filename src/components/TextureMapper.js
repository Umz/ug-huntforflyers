import Buildings from "../consts/Buildings";

const TextureRegistry = {
    atlas: new Map(),
    getAtlas: (frame) => this.a.atlas.get(frame)    // No idea what 'this.a' is?
}

//  For loop - []
TextureRegistry.atlas.set(Buildings.LAB_TABLE, 'background');
TextureRegistry.atlas.set(Buildings.PLAYER_HOUSE, 'background');
TextureRegistry.atlas.set(Buildings.WATER_PUMP, 'background');

export default TextureRegistry;