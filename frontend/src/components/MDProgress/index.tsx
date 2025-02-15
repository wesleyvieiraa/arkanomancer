import { FC, forwardRef } from "react";

// Material Dashboard 2 PRO React TS components
import MDTypography from "components/MDTypography";

// Custom styles for MDProgress
import MDProgressRoot from "components/MDProgress/MDProgressRoot";

// Delcare props types for MDProgress
interface Props {
  variant?: "contained" | "gradient";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  value: number;
  label?: boolean;
  [key: string]: any;
}

const MDProgress: FC<Props> = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <MDTypography variant="button" fontWeight="medium" color="text">
        {value}%
      </MDTypography>
    )}
    <MDProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

// Declaring default props for MDProgress
MDProgress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

export default MDProgress;
