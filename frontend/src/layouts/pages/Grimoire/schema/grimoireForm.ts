const grimoireForm = {
  formId: "grimoire-form",
  formField: {
    name: {
      name: "name",
      type: "text",
      label: "Nome",
      placeholder: "Digite...",
      errorMaxMsg: "Nome excede o limite de caracteres",
      errorMinMsg: "Nome deve ter no mínimo 3 caracteres",
      errorRequired: "Nome é obrigatório",
    },
  },
};

export default grimoireForm;
