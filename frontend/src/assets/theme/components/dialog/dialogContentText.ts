// Material Dashboard 2 PRO React TS Base Styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

const { size } = typography;
const { text } = colors;

// types
type Types = any;

const dialogContentText: Types = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
