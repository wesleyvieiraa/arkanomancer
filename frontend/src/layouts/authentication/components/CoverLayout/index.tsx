import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import Footer from "layouts/authentication/components/Footer";

// Declaring props types for CoverLayout
interface Props {
  coverHeight?: string;
  image?: string;
  children: ReactNode;
}

function CoverLayout({ coverHeight, image, children }: Props): JSX.Element {
  return (
    <PageLayout>
      <MDBox width="calc(100% - 2rem)" minHeight={coverHeight} borderRadius="xl" mx={2} />
      <MDBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </PageLayout>
  );
}

// Declaring default props for CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

export default CoverLayout;
