import * as Yup from "yup";
import spellsForm from "./spellsForm";

const {
  formField: { keywords, executionId, durationId, rangeId, areaId, resistanceId, publication },
} = spellsForm;

const validations = Yup.object().shape({
  [keywords.name]: Yup.string()
    .max(500, keywords.errorMaxMsg)
    .min(3, keywords.errorMinMsg)
    .nullable(),
  [executionId.name]: Yup.number().nullable(),
  [durationId.name]: Yup.number().nullable(),
  [rangeId.name]: Yup.number().nullable(),
  [areaId.name]: Yup.number().nullable(),
  [resistanceId.name]: Yup.number().nullable(),
});

export default validations;
