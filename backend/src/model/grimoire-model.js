class Grimoire {
  constructor(dto) {
    this.grimoireId = dto.grimoire_id || dto.grimoireId;
    this.name = dto.name;
    this.userId = dto.user_id || dto.userId;
  }
}

module.exports = Grimoire;
