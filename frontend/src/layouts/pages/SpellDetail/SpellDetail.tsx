import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Spell } from "models/spell.model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spellService from "services/spell-service";
import box from "assets/img/box.png";
import MDTypography from "components/MDTypography";

export const SpellDetail = (): JSX.Element => {
  const { spellId } = useParams();
  const [spell, setSpell] = useState<Spell>();

  useEffect(() => {
    const getSpellById = async () => {
      try {
        const { spell } = await spellService.getSpellById(Number(spellId));
        setSpell(spell);
      } catch (error) {
        setSpell(null);
        console.error(error);
      }
    };

    getSpellById();
  }, []);

  return (
    <MDBox>
      <DashboardNavbar title={spell ? spell.name : "Magia não encontrada"} />
      {spell && (
        <MDBox mt={6}>
          <Grid container display="flex" justifyContent="center">
            <Grid item xs={10} sm={5} bgcolor="#F6F5F5" p={2}>
              <MDBox
                width="100%"
                height="100%"
                sx={{
                  backgroundImage: `url(${box})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "repeat-y",
                  backgroundPosition: "center",
                }}
              >
                <MDBox xs={12} py={4}>
                  <Grid container>
                    <Grid item xs={12} textAlign="center">
                      <MDTypography
                        variant="h2"
                        xs={12}
                        sx={{
                          fontFamily: "TormentaIOSB",
                          color: "#f0dc82",
                          fontVariant: "small-caps",
                          fontWeight: "normal",
                        }}
                        fontSize="2rem"
                      >
                        {spell.school}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} mt={2} textAlign="center">
                      <MDTypography
                        variant="h5"
                        xs={12}
                        sx={{
                          fontFamily: "TormentaIOSB",
                          color: "#f0dc82",
                          fontVariant: "small-caps",
                          fontWeight: "normal",
                        }}
                        fontSize="1.25rem"
                      >
                        {spell.type} - {spell.circle}º Círculo
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} mt={6} px={4}>
                      <MDTypography
                        variant="h5"
                        xs={12}
                        color="white"
                        sx={{
                          fontFamily: "TormentaIOSB",
                          fontVariant: "small-caps",
                          fontWeight: "normal",
                        }}
                        fontSize="1.15rem"
                      >
                        Execução
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} px={4}>
                      <MDTypography
                        variant="p"
                        xs={12}
                        color="white"
                        fontWeight="light"
                        sx={{
                          fontFamily: "TormentaIOSR",
                        }}
                        fontSize="1rem"
                      >
                        {spell.execution}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} mt={4} px={4}>
                      <MDTypography
                        variant="h5"
                        xs={12}
                        color="white"
                        sx={{
                          fontFamily: "TormentaIOSB",
                          fontVariant: "small-caps",
                          fontWeight: "normal",
                        }}
                        fontSize="1.15rem"
                      >
                        Alcance
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} px={4}>
                      <MDTypography
                        variant="p"
                        xs={12}
                        color="white"
                        fontWeight="light"
                        sx={{
                          fontFamily: "TormentaIOSR",
                        }}
                        fontSize="1rem"
                      >
                        {spell.range}
                      </MDTypography>
                    </Grid>
                    {spell.target && (
                      <MDBox>
                        <Grid item xs={12} mt={4} px={4}>
                          <MDTypography
                            variant="h5"
                            xs={12}
                            color="white"
                            sx={{
                              fontFamily: "TormentaIOSB",
                              fontVariant: "small-caps",
                              fontWeight: "normal",
                            }}
                            fontSize="1.15rem"
                          >
                            Alvo/Área/Efeito
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} px={4}>
                          <MDTypography
                            variant="p"
                            xs={12}
                            color="white"
                            fontWeight="light"
                            sx={{
                              fontFamily: "TormentaIOSR",
                            }}
                            fontSize="1rem"
                          >
                            {spell.target}
                          </MDTypography>
                        </Grid>
                      </MDBox>
                    )}
                    <Grid item xs={12} mt={4} px={4}>
                      <MDTypography
                        variant="h5"
                        xs={12}
                        color="white"
                        sx={{
                          fontFamily: "TormentaIOSB",
                          fontVariant: "small-caps",
                          fontWeight: "normal",
                        }}
                        fontSize="1.15rem"
                      >
                        Duração
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} px={4}>
                      <MDTypography
                        variant="p"
                        xs={12}
                        color="white"
                        fontWeight="light"
                        sx={{
                          fontFamily: "TormentaIOSR",
                        }}
                        fontSize="1rem"
                      >
                        {spell.duration}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} mt={4} px={4}>
                      <MDTypography
                        variant="h5"
                        xs={12}
                        color="white"
                        sx={{
                          fontFamily: "TormentaIOSB",
                          fontVariant: "small-caps",
                          fontWeight: "normal",
                        }}
                        fontSize="1.15rem"
                      >
                        Resistência
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} px={4}>
                      <MDTypography
                        variant="p"
                        xs={12}
                        color="white"
                        fontWeight="light"
                        sx={{
                          fontFamily: "TormentaIOSR",
                        }}
                        fontSize="1rem"
                      >
                        {spell.resistanceId ? spell.resistance : "Nenhuma"}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={10} sm={5} bgcolor="#F6F5F5">
              <MDBox xs={12} m={2} pt={3} pr={3}>
                <Grid container>
                  <Grid item xs={12} textAlign="center">
                    <MDTypography
                      variant="h1"
                      fontWeight="regular"
                      xs={12}
                      sx={{
                        fontFamily: "Tormenta",
                      }}
                      fontSize="2.5rem"
                      color="error"
                    >
                      {spell.name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} mt={2} textAlign="justify">
                    <MDTypography
                      variant="p"
                      fontWeight="regular"
                      xs={12}
                      sx={{
                        fontFamily: "TormentaIOSR",
                        textAlign: "justify",
                      }}
                      color="black"
                    >
                      {spell.description}
                    </MDTypography>
                  </Grid>
                  {spell.implements &&
                    spell.implements.map((impl) => {
                      return (
                        <Grid item xs={12} mt={2} key={impl.description} textAlign="justify">
                          <MDTypography
                            variant="p"
                            fontWeight="regular"
                            xs={12}
                            sx={{
                              fontFamily: "TormentaIOSB",
                              fontVariant: "small-caps",
                            }}
                            color="error"
                          >
                            {impl.cost}
                            {": "}
                          </MDTypography>
                          <MDTypography
                            variant="p"
                            fontWeight="regular"
                            xs={12}
                            sx={{
                              fontFamily: "TormentaIOSR",
                            }}
                            color="black"
                          >
                            {impl.description}
                          </MDTypography>
                        </Grid>
                      );
                    })}
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
    </MDBox>
  );
};
