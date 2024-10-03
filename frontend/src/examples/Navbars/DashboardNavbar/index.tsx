import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDButton from "components/MDButton";
import Logout from "layouts/authentication/logout";
// import Logout from "layouts/authentication/logout";

// Declaring prop types for DashboardNavbar
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
  title: string;
  titleToBradcrumb?: string;
}

function DashboardNavbar({
  absolute,
  light,
  isMini,
  title,
  titleToBradcrumb = "",
}: Props): JSX.Element {
  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenuUser, setOpenMenuUser] = useState<any>(false);
  const [openMenuNotifications, setOpenMenuNotifications] = useState<any>(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenuUser = (event: any) => setOpenMenuUser(event.currentTarget);
  const handleCloseMenuUser = () => setOpenMenuUser(false);
  const handleOpenMenuNotifications = (event: any) => setOpenMenuNotifications(event.currentTarget);
  const handleCloseMenuNotifications = () => setOpenMenuNotifications(false);

  // Render the notifications menu
  const renderMenuUser = () => (
    <Menu
      anchorEl={openMenuUser}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenuUser)}
      onClose={handleCloseMenuUser}
      sx={{ mt: 2 }}
    >
      <Logout />
    </Menu>
  );

  // Render the notifications menu
  const renderMenuNotifications = () => (
    <Menu
      anchorEl={openMenuNotifications}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenuNotifications)}
      onClose={handleCloseMenuNotifications}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Checar novas mensagens" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Gerenciar sessões de podcast" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Pagamento concluído com sucesso" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const nav = (url: string) => {
    navigate(url);
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { absolute, light, darkMode })}
    >
      <Toolbar sx={navbarContainer}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs
            icon="home"
            title={title ? title : route[route.length - 1]}
            route={route}
            light={light}
            titleToBradcrumb={titleToBradcrumb}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <MDButton type="button" variant="text" onClick={() => nav("/spell")}>
                Lista de Magias
              </MDButton>
              <MDButton type="button" variant="text" onClick={() => nav("/grimoire")}>
                Meus Grimórios
              </MDButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenMenuUser}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              {renderMenuUser()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
