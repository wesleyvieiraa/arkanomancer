// Material Dashboard 2 PRO React TS Base Styles
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;
const { text } = colors;
const { borderWidth, borderColor } = borders;

// types
type Types = any;

const dialogContent: Types = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: text.main,
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${borderColor}`,
      borderBottom: `${borderWidth[1]} solid ${borderColor}`,
    },
  },
};

export default dialogContent;
