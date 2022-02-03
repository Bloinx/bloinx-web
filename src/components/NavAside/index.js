/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import classnames from "classnames";
// import { Menu, Layout, Drawer } from "antd";
// import { Link } from "react-router-dom";
// import { FormattedMessage } from "react-intl";
// import {
//   DesktopOutlined,
//   HomeFilled,
//   // FileOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";

// import LogOut from "../../api/setLogout";

// import styles from "./styles.module.scss";
// import logo from "../../assets/logo.svg";
// import icon from "../../assets/icon.png";

// const { Sider } = Layout;

// function NavAside({ user, width, toggleDrawer, visible }) {
//   const [sliderStatus, setSliderStatus] = useState(false);
//   const isTablet = width <= 800;
//   const isMobile = width <= 768;

//   useEffect(() => {
//     if (isTablet && !sliderStatus) {
//       setSliderStatus(true);
//     }
//     if (!isMobile) {
//       toggleDrawer();
//     }
//   }, [width]);

//   const selected = 1;

//   const MenuOptions = () => (
//     <Menu
//       className={styles.MenuOptions}
//       defaultSelectedKeys={["1"]}
//       mode="inline"
//     >
//       {!isMobile && (
//         <div className={classnames(styles.logo, sliderStatus && styles.icon)}>
//           <img src={sliderStatus ? icon : logo} alt="bloinx-logo" />
//         </div>
//       )}
//       <Menu.Item className={styles.MenuItem} onClick={toggleDrawer}>
//         {/* <span>{user.email}</span> */}
//       </Menu.Item>
//       <Menu.Item
//         className={classnames(
//           styles.MenuItem,
//           selected === 1 && styles.MenuItemSelected
//         )}
//         key={1}
//         icon={<HomeFilled />}
//         onClick={toggleDrawer}
//       >
//         <Link to="/dashboard">
//           <span>
//             <FormattedMessage id="navAside.dashboard" />
//           </span>
//         </Link>
//       </Menu.Item>

//       <Menu.Item
//         className={classnames(
//           styles.MenuItem,
//           selected === 2 && styles.MenuItemSelected
//         )}
//         key={2}
//         icon={<LogoutOutlined />}
//         onClick={LogOut}
//       >
//         <span>
//           <FormattedMessage id="navAside.logout" />
//         </span>
//       </Menu.Item>
//       <Menu.Item
//         className={classnames(
//           styles.MenuItem,
//           selected === 2 && styles.MenuItemSelected
//         )}
//         key={2}
//         icon={<DesktopOutlined />}
//         onClick={toggleDrawer}
//       >
//         <a target="_blank" href="https://docs.bloinx.io/" rel="noreferrer">
//           <span>
//             <FormattedMessage id="navAside.docs" />
//           </span>
//         </a>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <>
//       {!isMobile && (
//         <Sider
//           collapsible={!isTablet}
//           collapsed={sliderStatus}
//           onCollapse={setSliderStatus}
//           className={styles.NavAside}
//         >
//           <MenuOptions />
//         </Sider>
//       )}
//       {isMobile && (
//         <Drawer
//           title={
//             <div className={styles.logoMobile}>
//               <img src={logo} alt="bloinx-logo" />
//             </div>
//           }
//           placement="left"
//           closable
//           onClose={toggleDrawer}
//           visible={visible}
//           bodyStyle={{
//             padding: 0,
//           }}
//           drawerStyle={{
//             backgroundColor: "#2B2D33",
//           }}
//           headerStyle={{
//             backgroundColor: "#2B2D33",
//             borderBottom: "0px",
//             color: "white",
//             padding: "0px",
//           }}
//         >
//           <MenuOptions />
//         </Drawer>
//       )}
//     </>
//   );
// }

// NavAside.propTypes = {
//   user: PropTypes.instanceOf(Object),
//   visible: PropTypes.bool,
//   width: PropTypes.number.isRequired,
//   toggleDrawer: PropTypes.func.isRequired,
// };

// NavAside.defaultProps = {
//   user: undefined,
//   visible: false,
// };

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };

// export default connect(mapStateToProps)(NavAside);

import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { Logout, PersonalVideo } from "@mui/icons-material";

import styles from "./index.module.scss";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function NavAside({ visible, toggleDrawer }) {
  return (
    <Drawer variant="permanent" open={visible}>
      <DrawerHeader className={styles.NavAsideHeader}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          {!visible ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Mis Rondas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonalVideo />
          </ListItemIcon>
          <ListItemText primary="Tutoriales" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default React.memo(NavAside);
