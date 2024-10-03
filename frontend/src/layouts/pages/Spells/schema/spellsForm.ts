const spellsForm = {
  formId: "spells-form",
  formField: {
    arcane: {
      name: "arcane",
      type: "checkbox",
      label: "Arcana",
    },
    divine: {
      name: "divine",
      type: "boolean",
      label: "Divina",
    },
    universal: {
      name: "universal",
      type: "boolean",
      label: "Universal",
    },
    abjuration: {
      name: "abjuration",
      type: "boolean",
      label: "Abjuração",
    },
    divination: {
      name: "divination",
      type: "boolean",
      label: "Adivinhação",
    },
    convocation: {
      name: "convocation",
      type: "boolean",
      label: "Convocação",
    },
    enchantment: {
      name: "enchantment",
      type: "boolean",
      label: "Encantamento",
    },
    evocation: {
      name: "evocation",
      type: "boolean",
      label: "Evocação",
    },
    illusion: {
      name: "illusion",
      type: "boolean",
      label: "Ilusão",
    },
    necromancy: {
      name: "necromancy",
      type: "boolean",
      label: "Necromancia",
    },
    transmutation: {
      name: "transmutation",
      type: "boolean",
      label: "Transmutação",
    },
    keywords: {
      name: "keywords",
      type: "text",
      label: "Palavras Chave",
      placeholder: "Digite...",
      errorMaxMsg: "Palavras-chave excede o limite de caracteres",
      errorMinMsg: "Palavras-chave deve ter no mínimo 3 caracteres",
    },
    executionId: {
      name: "executionId",
      type: "text",
      label: "Execução",
      placeholder: "Digite...",
      errorMaxMsg: "Execução excede o limite de caracteres",
      errorMinMsg: "Execução deve ter no mínimo 3 caracteres",
    },
    durationId: {
      name: "durationId",
      type: "text",
      label: "Duração",
      placeholder: "Digite...",
      errorMaxMsg: "Duração excede o limite de caracteres",
      errorMinMsg: "Duração deve ter no mínimo 3 caracteres",
    },
    rangeId: {
      name: "rangeId",
      type: "text",
      label: "Alcance",
      placeholder: "Digite...",
      errorMaxMsg: "Alcance excede o limite de caracteres",
      errorMinMsg: "Alcance deve ter no mínimo 3 caracteres",
    },
    areaId: {
      name: "areaId",
      type: "text",
      label: "Alvo, Área ou Efeito",
      placeholder: "Digite...",
      errorMaxMsg: "Alvo, Área ou Efeito excede o limite de caracteres",
      errorMinMsg: "Alvo, Área ou Efeito deve ter no mínimo 3 caracteres",
    },
    resistanceId: {
      name: "resistanceId",
      type: "text",
      label: "Resistência",
      placeholder: "Digite...",
      errorMaxMsg: "Resistência excede o limite de caracteres",
      errorMinMsg: "Resistência deve ter no mínimo 3 caracteres",
    },
    publication: {
      name: "publication",
      type: "number",
      label: "Publicação",
      placeholder: "Selecione",
    },
  },
};

export default spellsForm;
