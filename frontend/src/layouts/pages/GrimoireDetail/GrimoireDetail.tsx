import { Grid, Icon } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { GrimoireModel } from "models/grimoire.model";
import { Spell } from "models/spell.model";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import grimoireSpellService from "services/grimoire-spell.service";
import grimoireService from "services/grimoire.service";
import spellService from "services/spell-service";
import { defineAvatarBlack } from "util/defineAvatar";
import SpellForm from "../Spells/components/SpellForm";
import { ReactSVG } from "react-svg";
import { defineSchoolIcon } from "util/defineSVG";

export const GrimoireDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { grimoireId } = useParams();
  const [spells, setSpells] = useState<Spell[]>([]);
  const [quantitySpells, setQuantitySpells] = useState(0);
  const [grimoire, setGrimoire] = useState<GrimoireModel>(null);
  const [firstCircleSpellList, setFirstCircleSpellList] = useState<Spell[]>([]);
  const [secondCircleSpellList, setSecondCircleSpellList] = useState<Spell[]>([]);
  const [thirdCircleSpellList, setThirdCircleSpellList] = useState<Spell[]>([]);
  const [fourthCircleSpellList, setFourthCircleSpellList] = useState<Spell[]>([]);
  const [fifthCircleSpellList, setFifthCircleSpellList] = useState<Spell[]>([]);
  const [expandedFirstCircle, setExpandedFirstCircle] = useState(true);
  const [expandedSecondCircle, setExpandedSecondCircle] = useState(true);
  const [expandedThirdCircle, setExpandedThirdCircle] = useState(true);
  const [expandedFourthCircle, setExpandedFourthCircle] = useState(true);
  const [expandedFifthCircle, setExpandedFifthCircle] = useState(true);
  const [open, setOpen] = useState(false);
  const [spellIdToRemove, setSpellIdToRemove] = useState(null);

  const getByGrimoireAndUser = async () => {
    try {
      const { spells } = await spellService.getByGrimoireAndUser(Number(grimoireId));
      setSpells(spells);
      setQuantitySpells(spells.length);
    } catch (error) {
      setSpells([]);
      console.error(error);
    }
  };

  const getByGrimoire = async () => {
    try {
      const { grimoire } = await grimoireService.getGrimoireById(Number(grimoireId));
      setGrimoire(grimoire);
    } catch (error) {
      setGrimoire(null);
      console.error(error);
    }
  };

  useEffect(() => {
    getByGrimoire();
    getByGrimoireAndUser();
  }, []);

  useEffect(() => {
    const splitSpellsByCircle = () => {
      setFirstCircleSpellList(spells.filter((spell) => spell.circle === 1));
      setSecondCircleSpellList(spells.filter((spell) => spell.circle === 2));
      setThirdCircleSpellList(spells.filter((spell) => spell.circle === 3));
      setFourthCircleSpellList(spells.filter((spell) => spell.circle === 4));
      setFifthCircleSpellList(spells.filter((spell) => spell.circle === 5));
    };
    splitSpellsByCircle();
  }, [spells]);

  const navToSpell = (id: number) => {
    navigate(`/spell/${id}`);
  };

  const nav = (url: string) => {
    navigate(url);
  };

  const handleOpen = (id: number) => {
    setSpellIdToRemove(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSpellIdToRemove(null);
    setOpen(false);
  };

  const deleteSpell = async () => {
    try {
      if (!spellIdToRemove) {
        return;
      }
      handleClose();
      await grimoireSpellService.disassociate(grimoire.grimoireId, spellIdToRemove);
      await getByGrimoireAndUser();
    } catch (error) {
      console.error(error);
    }
  };

  const spellPrepare = async (id: number, prepared: boolean) => {
    const updatedSpells = spells.map((spell) => {
      if (spell.spellId === id) {
        return { ...spell, prepared: !prepared };
      }
      return spell;
    });
    setSpells(updatedSpells);
    await grimoireSpellService.update(grimoire.grimoireId, id, !prepared);
  };

  const handleSpellsUpdate = (spells: Spell[]) => {
    setSpells(spells);
  };

  return (
    <MDBox>
      <DashboardNavbar title={grimoire ? grimoire.name : ""} />
      <MDBox mt={6}>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={10} sm={5} bgcolor="#F6F5F5">
            <SpellForm
              onSpellsUpdate={handleSpellsUpdate}
              grimoireId={grimoire ? grimoire.grimoireId : null}
            />
          </Grid>
          <Grid item xs={10} sm={5} bgcolor="#F6F5F5">
            <MDBox m={2}>
              {grimoire && (
                <Grid container>
                  <Grid item xs={12}>
                    <MDBox my={2} display="flex" justifyContent="center" alignItems="center">
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
                        {grimoire.name}: {quantitySpells} magia{quantitySpells > 1 ? "s" : ""}
                      </MDTypography>
                      <MDButton
                        variant="text"
                        size="large"
                        iconOnly
                        color="error"
                        onClick={() => nav(`/spell?grimoireId=${grimoire.grimoireId}`)}
                      >
                        <Icon>library_add</Icon>
                      </MDButton>
                    </MDBox>
                    <MDBox px={2}>
                      {firstCircleSpellList.length > 0 && (
                        <MDBox>
                          <Grid container>
                            <Grid item xs={12}>
                              <MDBox
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "lightgray",
                                  },
                                  cursor: "pointer",
                                }}
                                onClick={() => setExpandedFirstCircle(!expandedFirstCircle)}
                              >
                                <MDBox display="flex" justifyContent="flex-start">
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "10vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "2.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    1º Círculo{" "}
                                  </MDTypography>
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "5vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "1.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    (1pm)
                                  </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography
                                    variant="caption"
                                    sx={{
                                      color: "#000000",
                                    }}
                                    fontWeight="regular"
                                  >
                                    <Icon fontSize="large">
                                      {expandedFirstCircle
                                        ? "keyboard_arrow_down"
                                        : "keyboard_arrow_left"}
                                    </Icon>
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            </Grid>

                            {expandedFirstCircle && (
                              <Grid item xs={12}>
                                <MDBox pl="16px">
                                  {firstCircleSpellList.map((spell) => {
                                    return (
                                      <MDBox
                                        key={spell.spellId}
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          transition: "background-color 0.3s ease",
                                          "&:hover": {
                                            backgroundColor: "lightgray",
                                          },
                                        }}
                                      >
                                        <MDBox mr={1}>
                                          <MDButton
                                            color="error"
                                            variant={"outlined"}
                                            onClick={() =>
                                              spellPrepare(spell.spellId, spell.prepared)
                                            }
                                            sx={{
                                              border: "none",
                                              borderColor: "#d13235",
                                            }}
                                            iconOnly
                                            circular
                                          >
                                            <Icon
                                              sx={{ color: spell.prepared ? "#d13235" : "#b6b6b6" }}
                                            >
                                              brightness_7
                                            </Icon>
                                          </MDButton>
                                        </MDBox>
                                        <MDBox mr={1}>
                                          <ReactSVG
                                            src={defineSchoolIcon(spell.schoolId)}
                                            style={{
                                              fill: spell.prepared ? "#d13235" : "#b6b6b6",
                                              width: "18px",
                                              height: "auto",
                                            }}
                                          />
                                        </MDBox>
                                        <MDTypography
                                          variant="h5"
                                          sx={{
                                            fontFamily: "TormentaIOSB",
                                            fontVariant: "small-caps",
                                            fontWeight: "normal",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => navToSpell(spell.spellId)}
                                        >
                                          {spell.name}
                                        </MDTypography>
                                        <Icon
                                          sx={{
                                            cursor: "pointer",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            ml: "auto",
                                          }}
                                          onClick={() => handleOpen(spell.spellId)}
                                        >
                                          delete_forever
                                        </Icon>
                                      </MDBox>
                                    );
                                  })}
                                </MDBox>
                              </Grid>
                            )}
                          </Grid>
                        </MDBox>
                      )}

                      {secondCircleSpellList.length > 0 && (
                        <MDBox>
                          <Grid container>
                            <Grid item xs={12}>
                              <MDBox
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "lightgray",
                                  },
                                  cursor: "pointer",
                                }}
                                onClick={() => setExpandedSecondCircle(!expandedSecondCircle)}
                              >
                                <MDBox display="flex" justifyContent="flex-start">
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "10vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "2.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    2º Círculo{" "}
                                  </MDTypography>
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "5vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "1.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    (3pm)
                                  </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography
                                    variant="caption"
                                    sx={{
                                      color: "#000000",
                                    }}
                                    fontWeight="regular"
                                  >
                                    <Icon fontSize="large">
                                      {expandedSecondCircle
                                        ? "keyboard_arrow_down"
                                        : "keyboard_arrow_left"}
                                    </Icon>
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            </Grid>

                            {expandedSecondCircle && (
                              <Grid item xs={12}>
                                <MDBox pl="16px">
                                  {secondCircleSpellList.map((spell) => {
                                    return (
                                      <MDBox
                                        key={spell.spellId}
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          transition: "background-color 0.3s ease",
                                          "&:hover": {
                                            backgroundColor: "lightgray",
                                          },
                                        }}
                                      >
                                        <MDBox mr={2}>
                                          <MDButton
                                            color="error"
                                            variant={"outlined"}
                                            onClick={() =>
                                              spellPrepare(spell.spellId, spell.prepared)
                                            }
                                            sx={{
                                              border: "none",
                                              borderColor: "#d13235",
                                            }}
                                            iconOnly
                                            circular
                                          >
                                            <Icon
                                              sx={{ color: spell.prepared ? "#d13235" : "#b6b6b6" }}
                                            >
                                              brightness_7
                                            </Icon>
                                          </MDButton>
                                        </MDBox>
                                        <MDBox mr="10px">
                                          <ReactSVG
                                            src={defineSchoolIcon(spell.schoolId)}
                                            style={{
                                              fill: spell.prepared ? "#d13235" : "#b6b6b6",
                                              width: "18px",
                                              height: "auto",
                                            }}
                                          />
                                        </MDBox>
                                        <MDTypography
                                          sx={{
                                            fontFamily: "TormentaIOSB",
                                            fontVariant: "small-caps",
                                            fontWeight: "normal",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => navToSpell(spell.spellId)}
                                        >
                                          {spell.name}
                                        </MDTypography>
                                        <Icon
                                          sx={{
                                            cursor: "pointer",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            ml: "auto",
                                          }}
                                          onClick={() => handleOpen(spell.spellId)}
                                        >
                                          delete_forever
                                        </Icon>
                                      </MDBox>
                                    );
                                  })}
                                </MDBox>
                              </Grid>
                            )}
                          </Grid>
                        </MDBox>
                      )}

                      {thirdCircleSpellList.length > 0 && (
                        <MDBox>
                          <Grid container>
                            <Grid item xs={12}>
                              <MDBox
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "lightgray",
                                  },
                                  cursor: "pointer",
                                }}
                                onClick={() => setExpandedThirdCircle(!expandedThirdCircle)}
                              >
                                <MDBox display="flex" justifyContent="flex-start">
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "10vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "2.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    3º Círculo{" "}
                                  </MDTypography>
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "5vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "1.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    (6pm)
                                  </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography
                                    variant="caption"
                                    sx={{
                                      color: "#000000",
                                    }}
                                    fontWeight="regular"
                                  >
                                    <Icon fontSize="large">
                                      {expandedThirdCircle
                                        ? "keyboard_arrow_down"
                                        : "keyboard_arrow_left"}
                                    </Icon>
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            </Grid>

                            {expandedThirdCircle && (
                              <Grid item xs={12}>
                                <MDBox pl="16px">
                                  {thirdCircleSpellList.map((spell) => {
                                    return (
                                      <MDBox
                                        key={spell.spellId}
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          transition: "background-color 0.3s ease",
                                          "&:hover": {
                                            backgroundColor: "lightgray",
                                          },
                                        }}
                                      >
                                        <MDBox mr={2}>
                                          <MDButton
                                            color="error"
                                            variant={"outlined"}
                                            onClick={() =>
                                              spellPrepare(spell.spellId, spell.prepared)
                                            }
                                            sx={{
                                              border: "none",
                                              borderColor: "#d13235",
                                            }}
                                            iconOnly
                                            circular
                                          >
                                            <Icon
                                              sx={{ color: spell.prepared ? "#d13235" : "#b6b6b6" }}
                                            >
                                              brightness_7
                                            </Icon>
                                          </MDButton>
                                        </MDBox>
                                        <MDBox mr="10px">
                                          <ReactSVG
                                            src={defineSchoolIcon(spell.schoolId)}
                                            style={{
                                              fill: spell.prepared ? "#d13235" : "#b6b6b6",
                                              width: "18px",
                                              height: "auto",
                                            }}
                                          />
                                        </MDBox>
                                        <MDTypography
                                          sx={{
                                            fontFamily: "TormentaIOSB",
                                            fontVariant: "small-caps",
                                            fontWeight: "normal",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => navToSpell(spell.spellId)}
                                        >
                                          {spell.name}
                                        </MDTypography>
                                        <Icon
                                          sx={{
                                            cursor: "pointer",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            ml: "auto",
                                          }}
                                          onClick={() => handleOpen(spell.spellId)}
                                        >
                                          delete_forever
                                        </Icon>
                                      </MDBox>
                                    );
                                  })}
                                </MDBox>
                              </Grid>
                            )}
                          </Grid>
                        </MDBox>
                      )}

                      {fourthCircleSpellList.length > 0 && (
                        <MDBox>
                          <Grid container>
                            <Grid item xs={12}>
                              <MDBox
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "lightgray",
                                  },
                                  cursor: "pointer",
                                }}
                                onClick={() => setExpandedFourthCircle(!expandedFourthCircle)}
                              >
                                <MDBox display="flex" justifyContent="flex-start">
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "10vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "2.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    4º Círculo{" "}
                                  </MDTypography>
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "5vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "1.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    (10pm)
                                  </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography
                                    variant="caption"
                                    sx={{
                                      color: "#000000",
                                    }}
                                    fontWeight="regular"
                                  >
                                    <Icon fontSize="large">
                                      {expandedFourthCircle
                                        ? "keyboard_arrow_down"
                                        : "keyboard_arrow_left"}
                                    </Icon>
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            </Grid>

                            {expandedFourthCircle && (
                              <Grid item xs={12}>
                                <MDBox pl="16px">
                                  {fourthCircleSpellList.map((spell) => {
                                    return (
                                      <MDBox
                                        key={spell.spellId}
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          transition: "background-color 0.3s ease",
                                          "&:hover": {
                                            backgroundColor: "lightgray",
                                          },
                                        }}
                                      >
                                        <MDBox mr={2}>
                                          <MDButton
                                            color="error"
                                            variant={"outlined"}
                                            onClick={() =>
                                              spellPrepare(spell.spellId, spell.prepared)
                                            }
                                            sx={{
                                              border: "none",
                                              borderColor: "#d13235",
                                            }}
                                            iconOnly
                                            circular
                                          >
                                            <Icon
                                              sx={{ color: spell.prepared ? "#d13235" : "#b6b6b6" }}
                                            >
                                              brightness_7
                                            </Icon>
                                          </MDButton>
                                        </MDBox>
                                        <MDBox mr="10px">
                                          <ReactSVG
                                            src={defineSchoolIcon(spell.schoolId)}
                                            style={{
                                              fill: spell.prepared ? "#d13235" : "#b6b6b6",
                                              width: "18px",
                                              height: "auto",
                                            }}
                                          />
                                        </MDBox>
                                        <MDTypography
                                          sx={{
                                            fontFamily: "TormentaIOSB",
                                            fontVariant: "small-caps",
                                            fontWeight: "normal",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => navToSpell(spell.spellId)}
                                        >
                                          {spell.name}
                                        </MDTypography>
                                        <Icon
                                          sx={{
                                            cursor: "pointer",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            ml: "auto",
                                          }}
                                          onClick={() => handleOpen(spell.spellId)}
                                        >
                                          delete_forever
                                        </Icon>
                                      </MDBox>
                                    );
                                  })}
                                </MDBox>
                              </Grid>
                            )}
                          </Grid>
                        </MDBox>
                      )}

                      {fifthCircleSpellList.length > 0 && (
                        <MDBox>
                          <Grid container>
                            <Grid item xs={12}>
                              <MDBox
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "lightgray",
                                  },
                                  cursor: "pointer",
                                }}
                                onClick={() => setExpandedFifthCircle(!expandedFifthCircle)}
                              >
                                <MDBox display="flex" justifyContent="flex-start">
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "10vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "2.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    5º Círculo{" "}
                                  </MDTypography>
                                  <MDTypography
                                    fontWeight="regular"
                                    sx={{
                                      fontFamily: "Tormenta",
                                      fontSize: "5vw",
                                      "@media (min-width: 600px)": {
                                        fontSize: "1.5rem",
                                      },
                                      color: "#000000",
                                    }}
                                  >
                                    (15pm)
                                  </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography
                                    variant="caption"
                                    sx={{
                                      color: "#000000",
                                    }}
                                    fontWeight="regular"
                                  >
                                    <Icon fontSize="large">
                                      {expandedFifthCircle
                                        ? "keyboard_arrow_down"
                                        : "keyboard_arrow_left"}
                                    </Icon>
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            </Grid>

                            {expandedFifthCircle && (
                              <Grid item xs={12}>
                                <MDBox pl="16px">
                                  {fifthCircleSpellList.map((spell) => {
                                    return (
                                      <MDBox
                                        key={spell.spellId}
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          transition: "background-color 0.3s ease",
                                          "&:hover": {
                                            backgroundColor: "lightgray",
                                          },
                                        }}
                                      >
                                        <MDBox mr={2}>
                                          <MDButton
                                            color="error"
                                            variant={"outlined"}
                                            onClick={() =>
                                              spellPrepare(spell.spellId, spell.prepared)
                                            }
                                            sx={{
                                              border: "none",
                                              borderColor: "#d13235",
                                            }}
                                            iconOnly
                                            circular
                                          >
                                            <Icon
                                              sx={{ color: spell.prepared ? "#d13235" : "#b6b6b6" }}
                                            >
                                              brightness_7
                                            </Icon>
                                          </MDButton>
                                        </MDBox>
                                        <MDBox mr="10px">
                                          <ReactSVG
                                            src={defineSchoolIcon(spell.schoolId)}
                                            style={{
                                              fill: spell.prepared ? "#d13235" : "#b6b6b6",
                                              width: "18px",
                                              height: "auto",
                                            }}
                                          />
                                        </MDBox>
                                        <MDTypography
                                          sx={{
                                            fontFamily: "TormentaIOSB",
                                            fontVariant: "small-caps",
                                            fontWeight: "normal",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => navToSpell(spell.spellId)}
                                        >
                                          {spell.name}
                                        </MDTypography>
                                        <Icon
                                          sx={{
                                            cursor: "pointer",
                                            color: spell.prepared ? "#d13235" : "#b6b6b6",
                                            ml: "auto",
                                          }}
                                          onClick={() => handleOpen(spell.spellId)}
                                        >
                                          delete_forever
                                        </Icon>
                                      </MDBox>
                                    );
                                  })}
                                </MDBox>
                              </Grid>
                            )}
                          </Grid>
                        </MDBox>
                      )}
                    </MDBox>
                  </Grid>
                </Grid>
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDModal title="Tem certeza que deseja excluir a magia?" open={open} onClose={handleClose}>
        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="dark" onClick={handleClose}>
            Não
          </MDButton>
          <MDButton variant="gradient" color="light" onClick={() => deleteSpell()}>
            Sim
          </MDButton>
        </MDBox>
      </MDModal>
    </MDBox>
  );
};
