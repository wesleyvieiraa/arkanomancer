import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Spell } from "models/spell.model";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spellService from "services/spell-service";
import MDTypography from "components/MDTypography";
import { ReactSVG } from "react-svg";
import cardBg from "assets/bg/bg-card.png";
import cardBgXs from "assets/bg/bg-card-xs.png";
import cardBgBig from "assets/bg/bg-card-big.png";
import ex from "assets/Tormenta20-Assets/Dados/SVG/execucao.svg";
import rg from "assets/Tormenta20-Assets/Dados/SVG/alcance.svg";
import dr from "assets/Tormenta20-Assets/Dados/SVG/duracao.svg";
import ar from "assets/Tormenta20-Assets/Dados/SVG/area.svg";
import rs from "assets/Tormenta20-Assets/Dados/SVG/resistencia.svg";
import "./style.css";
import { defineSchoolIcon, defineSpellTypeIcon } from "util/defineSVG";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SpellDetail = (): JSX.Element => {
  const { spellId } = useParams();
  const [spell, setSpell] = useState<Spell>();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

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

  function isEven(num: number): boolean {
    return num % 2 === 0;
  }

  function buildBorder(num: number): object {
    let border: any = {
      borderBottom: "1px solid rgba(44, 6, 6, 0.5)",
    };
    if (!isEven(num)) {
      border = {
        backgroundImage: "linear-gradient(to right, rgba(44, 6, 6, 0.5), transparent)",
        backgroundPosition: "bottom",
        backgroundSize: "100% 1px",
        backgroundRepeat: "no-repeat",
      };
    }

    return border;
  }

  const buildGrid = (spell: Spell): JSX.Element => {
    const gridComponents: JSX.Element[] = [];

    if (spell.executionId) {
      gridComponents.push(
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: "linear-gradient(to right, rgba(44, 6, 6, 0.5), transparent)",
            backgroundPosition: "bottom",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MDBox display="flex" justifyContent="flex-start">
            <ReactSVG src={ex} style={{ width: isXs ? "4vw" : "1.5vw", fill: "#2C0606" }} />
            <MDTypography
              fontStyle="italic"
              fontSize="inherit"
              variant="p"
              fontWeight="regular"
              sx={{
                fontFamily: "TormentaIOSR",
                color: "#2C0606",
              }}
              pl={1}
            >
              {spell.execution}
            </MDTypography>
          </MDBox>
        </Grid>
      );
    }

    if (spell.rangeId) {
      gridComponents.push(
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: "linear-gradient(to right, rgba(44, 6, 6, 0.5), transparent)",
            backgroundPosition: "bottom",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MDBox display="flex" justifyContent="flex-start">
            <ReactSVG src={rg} style={{ width: isXs ? "4vw" : "1.5vw", fill: "#2C0606" }} />
            <MDTypography
              fontStyle="italic"
              fontSize="inherit"
              variant="p"
              fontWeight="regular"
              sx={{
                fontFamily: "TormentaIOSR",
                color: "#2C0606",
              }}
              pl={1}
            >
              {spell.range}
            </MDTypography>
          </MDBox>
        </Grid>
      );
    }

    if (spell.areaId) {
      gridComponents.push(
        <Grid item xs={12} sx={buildBorder(1)}>
          <MDBox display="flex" justifyContent="flex-start">
            <ReactSVG src={ar} style={{ width: isXs ? "4vw" : "1.5vw", fill: "#2C0606" }} />
            <MDTypography
              fontStyle="italic"
              fontSize="inherit"
              variant="p"
              fontWeight="regular"
              sx={{
                fontFamily: "TormentaIOSR",
                color: "#2C0606",
              }}
              pl={1}
            >
              {spell.area}
            </MDTypography>
          </MDBox>
        </Grid>
      );
    }

    if (spell.target) {
      gridComponents.push(
        <Grid item xs={12} sx={buildBorder(1)}>
          <MDBox display="flex" justifyContent="flex-start">
            <ReactSVG src={ar} style={{ width: isXs ? "4vw" : "1.5vw", fill: "#2C0606" }} />
            <MDTypography
              fontStyle="italic"
              fontSize="inherit"
              variant="p"
              fontWeight="regular"
              sx={{
                fontFamily: "TormentaIOSR",
                color: "#2C0606",
              }}
              pl={1}
            >
              {spell.target}
            </MDTypography>
          </MDBox>
        </Grid>
      );
    }

    if (spell.durationId) {
      gridComponents.push(
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: "linear-gradient(to right, rgba(44, 6, 6, 0.5), transparent)",
            backgroundPosition: "bottom",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MDBox display="flex" justifyContent="flex-start">
            <ReactSVG src={dr} style={{ width: isXs ? "4vw" : "1.5vw", fill: "#2C0606" }} />
            <MDTypography
              fontStyle="italic"
              fontSize="inherit"
              variant="p"
              fontWeight="regular"
              sx={{
                fontFamily: "TormentaIOSR",
                color: "#2C0606",
              }}
              pl={1}
            >
              {spell.duration}
            </MDTypography>
          </MDBox>
        </Grid>
      );
    }

    if (spell.resistanceId) {
      gridComponents.push(
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: "linear-gradient(to right, rgba(44, 6, 6, 0.5), transparent)",
            backgroundPosition: "bottom",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MDBox display="flex" justifyContent="flex-start">
            <ReactSVG src={rs} style={{ width: isXs ? "4vw" : "1.5vw", fill: "#2C0606" }} />
            <MDTypography
              fontStyle="italic"
              fontSize="inherit"
              variant="p"
              fontWeight="regular"
              sx={{
                fontFamily: "TormentaIOSR",
                color: "#2C0606",
              }}
              pl={1}
            >
              {spell.resistance}
            </MDTypography>
          </MDBox>
        </Grid>
      );
    }

    return <React.Fragment>{gridComponents}</React.Fragment>;
  };

  return (
    <MDBox>
      <DashboardNavbar title={spell ? spell.name : "Magia não encontrada"} />
      {spell && (
        <MDBox mt={6}>
          <Grid container display="flex" justifyContent="center">
            <Grid item xs={12} sm={8} lg={5} px={2}>
              <Grid container>
                <Grid item xs={6}>
                  <MDBox ml={4}>
                    <MDTypography
                      fontWeight="regular"
                      xs={12}
                      sx={{
                        fontFamily: "Tormenta",
                      }}
                      fontSize={isXs ? "6vw" : "2.5vw"}
                      color="white"
                    >
                      {spell.name}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="end">
                  <MDTypography
                    variant="h1"
                    fontWeight="regular"
                    xs={12}
                    sx={{
                      fontFamily: "Tormenta",
                    }}
                    fontSize={isXs ? "10vw" : "4vw"}
                    color="white"
                    pr={3}
                  >
                    {spell.circle}º
                  </MDTypography>
                  <MDBox
                    mr={4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    width={isXs ? "18vw" : "8vw"}
                    height={"auto"}
                    maxWidth={"500px"}
                  >
                    <ReactSVG
                      src={defineSpellTypeIcon(spell.typeId)}
                      className="svg first-svg"
                      style={{ fill: "white" }}
                    />
                    <MDBox
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      position="relative"
                      width={"40%"}
                    >
                      <ReactSVG
                        src={defineSchoolIcon(spell.schoolId)}
                        className="svg second-svg"
                        style={{ fill: "white" }}
                      />
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox
                // width="100%"
                // height="100%"
                sx={{
                  backgroundImage: `url(${cardBgBig})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "repeat-y",
                  backgroundPosition: "center",
                }}
              >
                <MDBox xs={12} mx={2} pb={3} px={5}>
                  <Grid container>
                    <Grid container py={4}>
                      {buildGrid(spell)}
                    </Grid>
                    <Grid item xs={12} textAlign="justify">
                      <MDTypography
                        variant="p"
                        fontWeight="regular"
                        xs={12}
                        sx={{
                          fontFamily: "TormentaIOSR",
                          textAlign: "justify",
                        }}
                        color="black"
                        fontSize="inherit"
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
                              sx={{
                                fontFamily: "TormentaIOSB",
                                fontVariant: "small-caps",
                              }}
                              color="error"
                              fontSize="inherit"
                            >
                              {impl.cost}
                              {": "}
                            </MDTypography>
                            <MDTypography
                              variant="p"
                              fontWeight="regular"
                              sx={{
                                fontFamily: "TormentaIOSR",
                              }}
                              fontSize="inherit"
                              color="black"
                            >
                              {impl.description}
                            </MDTypography>
                          </Grid>
                        );
                      })}
                  </Grid>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
    </MDBox>
  );
};
