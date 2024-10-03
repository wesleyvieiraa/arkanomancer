import { Checkbox, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Spell } from "models/spell.model";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import spellService from "services/spell-service";
import MDAvatar from "components/MDAvatar";
import { defineAvatar } from "util/defineAvatar";
import grimoireService from "services/grimoire.service";
import MDButton from "components/MDButton";
import grimoireSpellService from "services/grimoire-spell.service";

export const ListSpells = ({ filteredSpells }: { filteredSpells: Spell[] }) => {
  const navigate = useNavigate();
  const [grimoire, setGrimoire] = useState(null);
  const [spellList, setSpellList] = useState<Spell[]>([]);
  const [spellListOnGrimoire, setSpellListOnGrimoire] = useState<Spell[]>([]);
  const [spellListToAdd, setSpellListToAdd] = useState([]);
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const grimoireIdParam = searchParams.get("grimoireId");

  const getByGrimoire = async () => {
    try {
      const { grimoire } = await grimoireService.getGrimoireById(Number(grimoireIdParam));
      const { spells } = await spellService.getByGrimoireAndUser(Number(grimoireIdParam));
      setGrimoire(grimoire);
      setSpellListOnGrimoire(spells);
    } catch (error) {
      setGrimoire(null);
      setSpellListOnGrimoire([]);
      console.error(error);
    }
  };

  useEffect(() => {
    if (grimoireIdParam) {
      getByGrimoire();
    } else {
      setGrimoire(null);
      setSpellListOnGrimoire([]);
      listAllSpells();
    }
  }, [grimoireIdParam]);

  const listAllSpells = async () => {
    try {
      if (filteredSpells && filteredSpells.length > 0) {
        setSpellList(filteredSpells);
      } else {
        const { spells } = await spellService.getListAll();
        setSpellList(spells);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listAllSpells();
  }, [filteredSpells]);

  const splitSpellsByCircle = () => {
    setFirstCircleSpellList(
      spellList.filter(
        (spell) =>
          spell.circle === 1 && !spellListOnGrimoire.some((el) => el.spellId === spell.spellId)
      )
    );
    setSecondCircleSpellList(
      spellList.filter(
        (spell) =>
          spell.circle === 2 && !spellListOnGrimoire.some((el) => el.spellId === spell.spellId)
      )
    );
    setThirdCircleSpellList(
      spellList.filter(
        (spell) =>
          spell.circle === 3 && !spellListOnGrimoire.some((el) => el.spellId === spell.spellId)
      )
    );
    setFourthCircleSpellList(
      spellList.filter(
        (spell) =>
          spell.circle === 4 && !spellListOnGrimoire.some((el) => el.spellId === spell.spellId)
      )
    );
    setFifthCircleSpellList(
      spellList.filter(
        (spell) =>
          spell.circle === 5 && !spellListOnGrimoire.some((el) => el.spellId === spell.spellId)
      )
    );
  };

  useEffect(() => {
    splitSpellsByCircle();
  }, [spellList, spellListOnGrimoire]);

  const navToSpell = (id: number) => {
    navigate(`/spell/${id}`);
  };

  const addSpell = (id: number, checked: boolean) => {
    if (checked) {
      setSpellListToAdd((prevList) => [...prevList, id]);
    } else {
      setSpellListToAdd((prevList) => prevList.filter((spellId) => spellId !== id));
    }
  };

  const associateMultiple = async () => {
    try {
      if (spellListToAdd.length > 0) {
        const { spells } = await grimoireSpellService.associateMultiple(
          spellListToAdd,
          Number(grimoireIdParam)
        );
        setSpellListOnGrimoire((prevList) => [...prevList, ...spells]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MDBox>
      {grimoire && (
        <MDBox>
          <MDBox className="float-end">
            <MDButton color="error" onClick={associateMultiple}>
              <Icon>save</Icon> Salvar
            </MDButton>
          </MDBox>
          <MDBox display="flex" justifyContent="center" alignItems="center" mb={4}>
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
              {grimoire.name}
            </MDTypography>
          </MDBox>
        </MDBox>
      )}
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
                    1º Círculo{" "}
                  </MDTypography>
                  <MDTypography
                    color="error"
                    fontWeight="regular"
                    sx={{
                      fontFamily: "Tormenta",
                      fontSize: "5vw",
                      "@media (min-width: 600px)": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    (1pm)
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="caption" color="secondary" fontWeight="regular">
                    <Icon color="error" fontSize="large">
                      {expandedFirstCircle ? "keyboard_arrow_down" : "keyboard_arrow_left"}
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
                        sx={{ cursor: "pointer" }}
                      >
                        {grimoire && (
                          <Checkbox
                            checked={spellListToAdd.includes(spell.spellId)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              addSpell(spell.spellId, event.target.checked)
                            }
                          />
                        )}
                        <MDBox mr="10px">
                          <MDAvatar src={defineAvatar(spell.schoolId)} size="xxs" />
                        </MDBox>
                        <MDTypography
                          variant="h5"
                          sx={{
                            fontFamily: "TormentaIOSB",
                            fontVariant: "small-caps",
                            fontWeight: "normal",
                          }}
                          color={"error"}
                          onClick={() => navToSpell(spell.spellId)}
                        >
                          {spell.name}
                        </MDTypography>
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
                    2º Círculo{" "}
                  </MDTypography>
                  <MDTypography
                    color="error"
                    fontWeight="regular"
                    sx={{
                      fontFamily: "Tormenta",
                      fontSize: "5vw",
                      "@media (min-width: 600px)": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    (3pm)
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="caption" color="secondary" fontWeight="regular">
                    <Icon color="error" fontSize="large">
                      {expandedSecondCircle ? "keyboard_arrow_down" : "keyboard_arrow_left"}
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
                        sx={{ cursor: "pointer" }}
                      >
                        {grimoire && (
                          <Checkbox
                            checked={spellListToAdd.includes(spell.spellId)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              addSpell(spell.spellId, event.target.checked)
                            }
                          />
                        )}
                        <MDBox mr="10px">
                          <MDAvatar src={defineAvatar(spell.schoolId)} size="xxs" />
                        </MDBox>
                        <MDTypography
                          sx={{
                            fontFamily: "TormentaIOSB",
                            fontVariant: "small-caps",
                            fontWeight: "normal",
                          }}
                          color={"error"}
                          onClick={() => navToSpell(spell.spellId)}
                        >
                          {spell.name}
                        </MDTypography>
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
                    3º Círculo{" "}
                  </MDTypography>
                  <MDTypography
                    color="error"
                    fontWeight="regular"
                    sx={{
                      fontFamily: "Tormenta",
                      fontSize: "5vw",
                      "@media (min-width: 600px)": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    (6pm)
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="caption" color="secondary" fontWeight="regular">
                    <Icon color="error" fontSize="large">
                      {expandedThirdCircle ? "keyboard_arrow_down" : "keyboard_arrow_left"}
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
                        sx={{ cursor: "pointer" }}
                      >
                        {grimoire && (
                          <Checkbox
                            checked={spellListToAdd.includes(spell.spellId)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              addSpell(spell.spellId, event.target.checked)
                            }
                          />
                        )}
                        <MDBox mr="10px">
                          <MDAvatar src={defineAvatar(spell.schoolId)} size="xxs" />
                        </MDBox>
                        <MDTypography
                          sx={{
                            fontFamily: "TormentaIOSB",
                            fontVariant: "small-caps",
                            fontWeight: "normal",
                          }}
                          color={"error"}
                          onClick={() => navToSpell(spell.spellId)}
                        >
                          {spell.name}
                        </MDTypography>
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
                    4º Círculo{" "}
                  </MDTypography>
                  <MDTypography
                    color="error"
                    fontWeight="regular"
                    sx={{
                      fontFamily: "Tormenta",
                      fontSize: "5vw",
                      "@media (min-width: 600px)": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    (10pm)
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="caption" color="secondary" fontWeight="regular">
                    <Icon color="error" fontSize="large">
                      {expandedFourthCircle ? "keyboard_arrow_down" : "keyboard_arrow_left"}
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
                        sx={{ cursor: "pointer" }}
                      >
                        {grimoire && (
                          <Checkbox
                            checked={spellListToAdd.includes(spell.spellId)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              addSpell(spell.spellId, event.target.checked)
                            }
                          />
                        )}
                        <MDBox mr="10px">
                          <MDAvatar src={defineAvatar(spell.schoolId)} size="xxs" />
                        </MDBox>
                        <MDTypography
                          sx={{
                            fontFamily: "TormentaIOSB",
                            fontVariant: "small-caps",
                            fontWeight: "normal",
                          }}
                          color={"error"}
                          onClick={() => navToSpell(spell.spellId)}
                        >
                          {spell.name}
                        </MDTypography>
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
                    5º Círculo{" "}
                  </MDTypography>
                  <MDTypography
                    color="error"
                    fontWeight="regular"
                    sx={{
                      fontFamily: "Tormenta",
                      fontSize: "5vw",
                      "@media (min-width: 600px)": {
                        fontSize: "1.5rem",
                      },
                    }}
                  >
                    (15pm)
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center">
                  <MDTypography variant="caption" color="secondary" fontWeight="regular">
                    <Icon color="error" fontSize="large">
                      {expandedFifthCircle ? "keyboard_arrow_down" : "keyboard_arrow_left"}
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
                        sx={{ cursor: "pointer" }}
                      >
                        {grimoire && (
                          <Checkbox
                            checked={spellListToAdd.includes(spell.spellId)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              addSpell(spell.spellId, event.target.checked)
                            }
                          />
                        )}
                        <MDBox mr="10px">
                          <MDAvatar src={defineAvatar(spell.schoolId)} size="xxs" />
                        </MDBox>
                        <MDTypography
                          sx={{
                            fontFamily: "TormentaIOSB",
                            fontVariant: "small-caps",
                            fontWeight: "normal",
                          }}
                          color={"error"}
                          onClick={() => navToSpell(spell.spellId)}
                        >
                          {spell.name}
                        </MDTypography>
                      </MDBox>
                    );
                  })}
                </MDBox>
              </Grid>
            )}
          </Grid>
        </MDBox>
      )}

      {grimoire && (
        <MDBox className="float-end" my={4}>
          <MDButton color="error" onClick={associateMultiple}>
            <Icon>save</Icon> Salvar
          </MDButton>
        </MDBox>
      )}
    </MDBox>
  );
};
