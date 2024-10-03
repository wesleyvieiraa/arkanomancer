// Material Dashboard 2 PRO React TS Base Styles
import colors from "assets/theme-dark/base/colors";
import typography from "assets/theme-dark/base/typography";

const { text, info } = colors;
const { size } = typography;

// types
type Types = any;

const inputLabel: Types = {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: text.main,
      lineHeight: 0.9,

      "&.Mui-focused": {
        color: info.main,
      },

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.5,
        fontSize: size.md,

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.85em",
        },
      },
    },

    sizeSmall: {
      fontSize: size.xs,
      lineHeight: 1.625,

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.6,
        fontSize: size.sm,

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.72em",
        },
      },
    },

    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "inherit",
        WebkitTextFillColor: "inherit",
        caretColor: "inherit",
      },
    },
  },
};

export default inputLabel;
