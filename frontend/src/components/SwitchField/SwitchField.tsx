import React from "react";
import { Field, Formik, Form, FieldProps, FormikProps } from "formik";
import { Switch, FormControlLabel } from "@mui/material";

// Defina os tipos de props do SwitchField
interface SwitchFieldProps {
  field: FieldProps["field"]; // Tipagem do campo vinda do Formik
  form: FormikProps<any>; // Tipagem do formulário vinda do Formik
  label: string; // Propriedade extra para o label do Switch
}

export const SwitchField: React.FC<SwitchFieldProps> = ({ field, form, label, ...props }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          {...field}
          checked={field.value}
          onChange={(event) => {
            form.setFieldValue(field.name, event.target.checked);
          }}
          {...props}
        />
      }
      label={label}
    />
  );
};
