class Spell {
  constructor(dto) {
    this.spellId = dto.spell_id || dto.spellId;
    this.circle = dto.circle;
    this.name = dto.name;
    this.execution = dto.execution;
    this.range = dto.range;
    this.target = dto.target;
    this.duration = dto.duration;
    this.resistance = dto.resistance;
    this.area = dto.area;
    this.type = dto.type;
    this.description = dto.description;
    this.school = dto.school;
    this.implements = dto.implements;
    this.executionId = dto.execution_id || dto.executionId;
    this.rangeId = dto.range_id || dto.rangeId;
    this.durationId = dto.duration_id || dto.durationId;
    this.resistanceId = dto.resistance_id || dto.resistanceId;
    this.areaId = dto.area_id || dto.areaId;
    this.typeId = dto.type_id || dto.typeId;
    this.schoolId = dto.school_id || dto.schoolId;
    this.prepared = dto.prepared || false;
  }
}

module.exports = Spell;
