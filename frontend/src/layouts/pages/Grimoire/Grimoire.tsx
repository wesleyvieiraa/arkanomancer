import { Box, Fade, Grid, Icon, Modal, Typography } from "@mui/material";
import FormFieldFormik from "components/FormFieldFormik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Formik, FormikHelpers, Form } from "formik";
import { GrimoireModel } from "models/grimoire.model";
import GrimoireI from "models/imp/grimoire.imp.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import grimoireService from "services/grimoire.service";
import grimoireForm from "./schema/grimoireForm";
import validations from "./schema/grimoireValidations";
import MDButton from "components/MDButton";
import MDModal from "components/MDModal";

export const Grimoire = (): JSX.Element => {
  const navigate = useNavigate();
  const [grimoires, setGrimoires] = useState<GrimoireModel[]>([]);
  const [grimoireId, setGrimoireId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (id: number) => {
    setGrimoireId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setGrimoireId(null);
    setOpen(false);
  };
  let initialValues = new GrimoireI();
  const { formField, formId } = grimoireForm;
  const { name } = formField;
  const currentValidation = validations;

  const listGrimoires = async () => {
    try {
      const { grimoires } = await grimoireService.listGrimoireByUserId();
      setGrimoires(grimoires);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listGrimoires();
  }, []);

  const navToGrimoire = (id: number) => {
    navigate(`/grimoire/${id}`);
  };

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    submitForm(values, actions);
  };

  const submitForm = async (values: any, actions: FormikHelpers<any>) => {
    try {
      await grimoireService.createGrimoire(values);
      actions.resetForm();
      await listGrimoires();
      actions.setSubmitting(false);
    } catch (error) {
      actions.resetForm();
      actions.setSubmitting(false);
      console.error(error);
    }
  };

  const deleteGrimoire = async () => {
    try {
      if (!grimoireId) {
        return;
      }
      handleClose();
      await grimoireService.deleteGrimoire(grimoireId);
      await listGrimoires();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MDBox>
      <DashboardNavbar title="Meus Grimórios" />
      <MDBox mt={6}>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={10} lg={5} p={3} bgcolor="#F6F5F5">
            <MDBox>
              <MDTypography
                color="error"
                fontWeight="regular"
                sx={{
                  fontFamily: "Tormenta",
                  fontSize: "10vw",
                  "@media (min-width: 600px)": {
                    fontSize: "2.5rem",
                  },
                }}
              >
                Criar grimório
              </MDTypography>

              <MDBox>
                <Formik
                  initialValues={initialValues}
                  validationSchema={currentValidation}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, isSubmitting, setFieldValue, resetForm }) => (
                    <Form id={formId} autoComplete="off">
                      <Grid container justifyContent="space-between">
                        <Grid item xs={8}>
                          <FormFieldFormik
                            type={name.type}
                            label={name.label}
                            name={name.name}
                            value={values.name}
                            placeholder={name.placeholder}
                            error={errors.name && touched.name}
                            success={values.name.length > 0 && !errors.name}
                            InputLabelProps={{
                              style: { color: "gray" },
                            }}
                            inputProps={{
                              style: { color: "gray" },
                            }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <MDButton
                            type="submit"
                            variant="gradient"
                            color="error"
                            disabled={isSubmitting}
                            iconOnly={true}
                          >
                            <Icon fontSize="large">save</Icon>
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </MDBox>
            </MDBox>
            {grimoires.length > 0 && (
              <MDBox my={2}>
                <MDTypography
                  mt={4}
                  mb={2}
                  color="error"
                  fontWeight="regular"
                  sx={{
                    fontFamily: "Tormenta",
                    fontSize: "10vw",
                    "@media (min-width: 600px)": {
                      fontSize: "2.5rem",
                    },
                  }}
                >
                  Grimórios cadastrados
                </MDTypography>
                {grimoires.map((grimoire) => {
                  return (
                    <Grid
                      container
                      key={grimoire.grimoireId}
                      sx={{
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                    >
                      <Grid item xs={10}>
                        <MDBox display="flex" alignItems="center">
                          <Icon color="error">auto_stories</Icon>
                          <MDTypography
                            variant="h5"
                            sx={{
                              fontFamily: "TormentaIOSB",
                              fontVariant: "small-caps",
                              fontWeight: "normal",
                              cursor: "pointer",
                            }}
                            color={"error"}
                            ml={2}
                            onClick={() => navToGrimoire(grimoire.grimoireId)}
                          >
                            {grimoire.name}
                          </MDTypography>
                        </MDBox>
                      </Grid>

                      <Grid item xs={2} display="flex" alignItems="center">
                        <Icon
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen(grimoire.grimoireId)}
                          color="error"
                        >
                          delete_forever
                        </Icon>
                      </Grid>
                    </Grid>
                  );
                })}
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>

      <MDModal title="Tem certeza que deseja excluir o grimório?" open={open} onClose={handleClose}>
        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="dark" onClick={handleClose}>
            Não
          </MDButton>
          <MDButton variant="gradient" color="light" onClick={() => deleteGrimoire()}>
            Sim
          </MDButton>
        </MDBox>
      </MDModal>
    </MDBox>
  );
};
