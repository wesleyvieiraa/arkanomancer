// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

// types
type Types = any;

const cardContent: Types = {
  styleOverrides: {
    root: {
      marginTop: 0,
      marginBottom: 0,
      padding: `${pxToRem(8)} ${pxToRem(24)} ${pxToRem(24)}`,
    },
  },
};

export default cardContent;
