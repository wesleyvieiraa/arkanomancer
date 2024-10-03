// Material Dashboard 2 PRO React TS Base Styles
import colors from "assets/theme-dark/base/colors";

const { transparent } = colors;

// types
type Types = any;

const textField: Types = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      ".MuiInputLabel-outlined:has(+ .MuiOutlinedInput-root > .MuiOutlinedInput-input:-webkit-autofill)":
        {
          transform: "translate(14px, -9px) scale(0.75)",
        },
      // Creates a hole around the text inside the border
      ".MuiOutlinedInput-input:-webkit-autofill + .MuiOutlinedInput-notchedOutline > legend": {
        maxWidth: "100%",
      },
    },
  },
};

export default textField;
