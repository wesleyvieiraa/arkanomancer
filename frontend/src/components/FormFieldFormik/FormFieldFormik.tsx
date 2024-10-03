import { ErrorMessage, Field } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { FC, ReactElement } from "react";

interface Props {
  label: string;
  name: string;
  is?: FC<any> | React.ReactElement<any, any>;
  variant?: string;
  [key: string]: any;
}

function FormFieldFormik({
  label,
  name,
  is = MDInput,
  variant = "standard",
  ...rest
}: Props): JSX.Element {
  return (
    <MDBox>
      <Field {...rest} name={name} as={is} variant={variant} label={label} fullWidth />
      <MDBox>
        <MDTypography component="div" variant="caption" color="warning" fontWeight="regular">
          {(<ErrorMessage name={name} />) as any}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default FormFieldFormik;
