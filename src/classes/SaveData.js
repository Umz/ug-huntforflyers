class SaveData {

    constructor() {

        this.stage = "";
        this.playTime = 0;

        this.collected = 0;
        this.materials = 0;
        this.kills = 0;
        this.built = 0;
        this.births = 0;

        this.playerName = "Prof. Replica";
        this.cks = 0;
        this.pks = 0;
        this.currency = 0;
        this.cloneIndex = 0;
        this.names = [];
        this.ckNames = [];
        this.graves = [];
    }

    addGraveData(data) {
        this.graves.push(data);
    }

    getTrackDataForGrave(offsetX) {
        let grave = {
            offsetX: Math.round(offsetX),
            name: this.playerName,
            time: Math.round(this.playTime),
            stage: this.stage,
            collected: this.collected,
            materials: this.materials,
            kills: this.kills,
            built: this.built,
            births: this.births,
        }
        return grave;
    }

    resetTrackData() {
        this.collected = 0;
        this.materials = 0;
        this.kills = 0;
        this.built = 0;
        this.births = 0;
    }

    updatePlayerData() {
        this.cloneIndex ++;
        this.playerName = this.names.length > 0 ? this.names.shift() :
            `Replica ${this.cloneIndex}`;
    }

    addPlayTime(amt) { this.playTime += amt }
    addCollected(amt) { this.collected += amt }
    addMaterials(amt) { this.materials += amt }
    addKills(amt) { this.kills += amt }
    addBirth(amt) { this.births += amt }

    getGraves() { return this.graves }

}
export default SaveData;