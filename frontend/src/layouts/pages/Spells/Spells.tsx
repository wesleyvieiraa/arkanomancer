import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ListSpells from "./components/ListSpells";
import { useState } from "react";
import { Spell } from "models/spell.model";
import SpellForm from "./components/SpellForm";

export const Spells = (): JSX.Element => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const handleSpellsUpdate = (spells: Spell[]) => {
    setSpells(spells);
  };

  return (
    <MDBox>
      <DashboardNavbar title="Lista de Magias" />
      <MDBox mt={6}>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={10} sm={5} bgcolor="#F6F5F5">
            <SpellForm onSpellsUpdate={handleSpellsUpdate} />
          </Grid>
          <Grid item xs={10} sm={5} bgcolor="#F6F5F5">
            <MDBox m={2}>
              <ListSpells filteredSpells={spells} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
};
