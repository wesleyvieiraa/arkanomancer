import { Autocomplete, FormControlLabel, Switch } from "@mui/material";
import FormFieldFormik from "components/FormFieldFormik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Form, Formik, FormikHelpers } from "formik";
import FormSpellImp from "models/imp/form-spell.imp";
import { Spell } from "models/spell.model";
import { useState } from "react";
import spellsForm from "../../schema/spellsForm";
import validations from "../../schema/spellsValidations";
import spellService from "services/spell-service";

interface SpellFormProps {
  onSpellsUpdate: (spells: Spell[]) => void;
  grimoireId?: number;
}

export const SpellForm = ({ onSpellsUpdate, grimoireId = null }: SpellFormProps): JSX.Element => {
  let initialValues = new FormSpellImp();
  const { formId, formField } = spellsForm;
  const {
    arcane,
    divine,
    universal,
    abjuration,
    divination,
    convocation,
    enchantment,
    evocation,
    illusion,
    necromancy,
    transmutation,
    keywords,
    executionId,
    durationId,
    rangeId,
    areaId,
    resistanceId,
    publication,
  } = formField;
  const currentValidation = validations;
  const optionsExecution = [
    { label: "Livre", id: 1 },
    { label: "Reação", id: 2 },
    { label: "Movimento", id: 3 },
    { label: "Padrão", id: 4 },
    { label: "Completa", id: 5 },
    { label: "Ritual", id: 6 },
  ];
  const optionsDuration = [
    { label: "Instântanea", id: 1 },
    { label: "Cena", id: 2 },
    { label: "Sustentada", id: 3 },
    { label: "Definida", id: 4 },
    { label: "Dia", id: 5 },
    { label: "Permanente", id: 6 },
  ];
  const optionsRange = [
    { label: "Pessoal", id: 1 },
    { label: "Toque", id: 2 },
    { label: "Curto", id: 3 },
    { label: "Médio", id: 4 },
    { label: "Longo", id: 5 },
    { label: "Ilimitado", id: 6 },
  ];
  const optionsTAE = [
    { label: "Linha", id: 1 },
    { label: "Alvo", id: 2 },
    { label: "Área", id: 3 },
    { label: "Criação", id: 4 },
  ];
  const optionsResistance = [
    { label: "Fortitude", id: 1 },
    { label: "Reflexos", id: 2 },
    { label: "Vontade", id: 3 },
  ];
  const optionsPublication = [
    { label: "Edição Jogo do Ano", id: 1 },
    { label: "Ameaças de Arton", id: 2 },
    { label: "Dragão Brasil", id: 3 },
    { label: "Errata do Almanaque Dragão Brasil", id: 4 },
    { label: "Guia dos NPC's", id: 5 },
  ];

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    submitForm(values, actions);
  };

  const submitForm = async (values: any, actions: FormikHelpers<any>) => {
    try {
      if (grimoireId) {
        values.grimoireId = grimoireId;
      }

      const { spells } = await spellService.getList(values);
      onSpellsUpdate(spells);
      actions.setSubmitting(false);
    } catch (error) {
      actions.resetForm();
      actions.setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <MDBox m={2} bgColor="#B62E34" p={2}>
      <Formik
        initialValues={initialValues}
        validationSchema={currentValidation}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue, resetForm, setValues }) => (
          <Form id={formId} autoComplete="off">
            <MDBox>
              <MDTypography sx={{ fontFamily: "TormentaIOSB" }}>Tipo</MDTypography>
              <FormControlLabel
                control={
                  <Switch
                    name={arcane.name}
                    value={values.arcane}
                    checked={values.arcane}
                    onChange={(event, checked) => {
                      setFieldValue(arcane.name, checked);
                    }}
                  />
                }
                label={arcane.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={divine.name}
                    value={values.divine}
                    checked={values.divine}
                    onChange={(event, checked) => {
                      setFieldValue(divine.name, checked);
                    }}
                  />
                }
                label={divine.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={universal.name}
                    value={values.universal}
                    checked={values.universal}
                    onChange={(event, checked) => {
                      setFieldValue(universal.name, checked);
                    }}
                  />
                }
                label={universal.label}
              />
            </MDBox>
            <MDBox mt={6}>
              <MDTypography sx={{ fontFamily: "TormentaIOSB" }}>Escola</MDTypography>
              <FormControlLabel
                control={
                  <Switch
                    name={abjuration.name}
                    value={values.abjuration}
                    checked={values.abjuration}
                    onChange={(event, checked) => {
                      setFieldValue(abjuration.name, checked);
                    }}
                  />
                }
                label={abjuration.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={divination.name}
                    value={values.divination}
                    checked={values.divination}
                    onChange={(event, checked) => {
                      setFieldValue(divination.name, checked);
                    }}
                  />
                }
                label={divination.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={convocation.name}
                    value={values.convocation}
                    checked={values.convocation}
                    onChange={(event, checked) => {
                      setFieldValue(convocation.name, checked);
                    }}
                  />
                }
                label={convocation.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={enchantment.name}
                    value={values.enchantment}
                    checked={values.enchantment}
                    onChange={(event, checked) => {
                      setFieldValue(enchantment.name, checked);
                    }}
                  />
                }
                label={enchantment.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={evocation.name}
                    value={values.evocation}
                    checked={values.evocation}
                    onChange={(event, checked) => {
                      setFieldValue(evocation.name, checked);
                    }}
                  />
                }
                label={evocation.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={illusion.name}
                    value={values.illusion}
                    checked={values.illusion}
                    onChange={(event, checked) => {
                      setFieldValue(illusion.name, checked);
                    }}
                  />
                }
                label={illusion.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={necromancy.name}
                    value={values.necromancy}
                    checked={values.necromancy}
                    onChange={(event, checked) => {
                      setFieldValue(necromancy.name, checked);
                    }}
                  />
                }
                label={necromancy.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    name={transmutation.name}
                    value={values.transmutation}
                    checked={values.transmutation}
                    onChange={(event, checked) => {
                      setFieldValue(transmutation.name, checked);
                    }}
                  />
                }
                label={transmutation.label}
              />
            </MDBox>
            <MDBox mt={6}>
              <FormFieldFormik
                type={keywords.type}
                label={keywords.label}
                name={keywords.name}
                value={values.keywords}
                placeholder={keywords.placeholder}
                error={errors.keywords && touched.keywords}
                success={values.keywords.length > 0 && !errors.keywords}
                helperText={"separe com ;"}
                FormHelperTextProps={{
                  style: {
                    color: "#ffffffcc",
                  },
                }}
              />
            </MDBox>
            <MDBox mt={3}>
              <Autocomplete
                options={optionsExecution}
                getOptionLabel={(option) => option.label}
                value={optionsExecution.find((option) => option.id === values.executionId) || null}
                onChange={(event, value) => {
                  setFieldValue("executionId", value?.id || "");
                }}
                renderInput={(params) => (
                  <FormFieldFormik
                    {...params}
                    label={executionId.label}
                    name={executionId.name}
                    placeholder={executionId.placeholder}
                  />
                )}
              />
            </MDBox>
            <MDBox mt={3}>
              <Autocomplete
                options={optionsDuration}
                getOptionLabel={(option) => option.label}
                value={optionsDuration.find((option) => option.id === values.durationId) || null}
                onChange={(event, value) => {
                  setFieldValue("durationId", value?.id || "");
                }}
                renderInput={(params) => (
                  <FormFieldFormik
                    {...params}
                    label={durationId.label}
                    name={durationId.name}
                    placeholder={durationId.placeholder}
                  />
                )}
              />
            </MDBox>
            <MDBox mt={3}>
              <Autocomplete
                options={optionsRange}
                getOptionLabel={(option) => option.label}
                value={optionsRange.find((option) => option.id === values.rangeId) || null}
                onChange={(event, value) => {
                  setFieldValue("rangeId", value?.id || "");
                }}
                renderInput={(params) => (
                  <FormFieldFormik
                    {...params}
                    label={rangeId.label}
                    name={rangeId.name}
                    placeholder={rangeId.placeholder}
                  />
                )}
              />
            </MDBox>
            <MDBox mt={3}>
              <Autocomplete
                options={optionsTAE}
                getOptionLabel={(option) => option.label}
                value={optionsTAE.find((option) => option.id === values.areaId) || null}
                onChange={(event, value) => {
                  setFieldValue("areaId", value?.id || "");
                }}
                renderInput={(params) => (
                  <FormFieldFormik
                    {...params}
                    label={areaId.label}
                    name={areaId.name}
                    placeholder={areaId.placeholder}
                  />
                )}
              />
            </MDBox>
            <MDBox mt={3}>
              <Autocomplete
                options={optionsResistance}
                getOptionLabel={(option) => option.label}
                value={
                  optionsResistance.find((option) => option.id === values.resistanceId) || null
                }
                onChange={(event, value) => {
                  setFieldValue("resistanceId", value?.id || "");
                }}
                renderInput={(params) => (
                  <FormFieldFormik
                    {...params}
                    label={resistanceId.label}
                    name={resistanceId.name}
                    value={values.resistanceId}
                    placeholder={resistanceId.placeholder}
                  />
                )}
              />
            </MDBox>
            <MDBox display="flex" justifyContent="space-between" mt={3} mx={3}>
              <MDButton
                type="button"
                variant="gradient"
                color="dark"
                onClick={() => {
                  resetForm({ values: initialValues });
                }}
              >
                Limpar
              </MDButton>
              <MDButton type="submit" variant="gradient" color="dark">
                Buscar
              </MDButton>
            </MDBox>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
};
