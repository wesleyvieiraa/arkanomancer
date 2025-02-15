// Material Dashboard 2 PRO React TS Base Styles
import borders from "assets/theme-dark/base/borders";
import colors from "assets/theme-dark/base/colors";

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from "assets/theme-dark/functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

// types
type Types = any;

const tableCell: Types = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};

export default tableCell;
