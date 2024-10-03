import * as Yup from "yup";
import grimoireForm from "./grimoireForm";

const {
  formField: { name },
} = grimoireForm;

const validations = Yup.object().shape({
  [name.name]: Yup.string()
    .max(255, name.errorMaxMsg)
    .min(3, name.errorMinMsg)
    .required(name.errorRequired),
});

export default validations;
