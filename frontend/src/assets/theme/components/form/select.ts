// Material Dashboard 2 PRO React TS Base Styles
import colors from "assets/theme/base/colors";

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent } = colors;

// types
type Types = any;

const select: Types = {
  styleOverrides: {
    select: {
      display: "grid",
      alignItems: "center",
      padding: `0 ${pxToRem(12)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      display: "none",
    },
  },
};

export default select;
