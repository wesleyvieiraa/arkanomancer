class GrimoireSpell {
  constructor(dto) {
    this.grimoireId = dto.grimoire_id || dto.grimoireId;
    this.grimoireName = dto.grimoire_name || dto.grimoireName || null;
    this.spellId = dto.spell_id || dto.spellId;
    this.spellName = dto.spell_name || dto.spellName || null;
    this.userId = dto.user_id || dto.userId;
    this.prepared = dto.prepared || false;
  }
}

module.exports = GrimoireSpell;
