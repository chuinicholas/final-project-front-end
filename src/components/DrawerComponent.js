import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import styles from "./DrawerComponent.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { auth } from "./firebase";
import sideDrawerPic from "../image/sideDrawer.png";

export default function DrawerComponent() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const logOutMenuItems = [
    { text: "會員登入", path: "/login", icon: <VpnKeyIcon /> },
    { text: "會員登記", path: "/register", icon: <GroupAddIcon /> },
    {
      text: "公告欄",
      path: "/bulletinBoard",
      icon: <CelebrationOutlinedIcon />,
    },
    { text: "分店位置", path: "/location", icon: <LocationOnIcon /> },
    /* { text: "關於我們", path: "/about", icon: <InfoIcon /> }, */
  ];

  const logInMenuItems = [
    /* { text: "帳戶資料", path: "/account", icon: <ManageAccountsIcon /> }, */
    { text: "訂單紀錄", path: "/record", icon: <ContentPasteIcon /> },
    {
      text: "公告欄",
      path: "/bulletinBoard",
      icon: <CelebrationOutlinedIcon />,
    },
    { text: "分店位置", path: "/location", icon: <LocationOnIcon /> },
    /* { text: "關於我們", path: "/about", icon: <InfoIcon /> }, */
  ];

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out!");
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  }
  return (
    <div className={styles.menuContainer}>
      <IconButton onClick={toggleDrawer(true)} className={styles.menuButton}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: styles.drawerPaper }} // Apply custom CSS class
      >
        <div className={styles.drawerContent}>
          <Box
            className={styles.sidebar}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {currentUser
                ? logInMenuItems.map((item) => (
                    <ListItem  key={item.text} /* className={styles.drawerItem} */ disablePadding>
                      <ListItemButton sx={{ borderRadius: "30px" }} /* className={styles.drawerButton} */ component={Link} to={item.path}>
                        <ListItemIcon sx={{ color: "#705B38", fontSize: "30px" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{ color: "#705B38" }}
                          primaryTypographyProps={{ fontSize: "25px",
                            /* fontFamily: "LXGW WenKai Mono TC, monospace",
                            fontWeight: "400px",
                            fontStyle: "normal",  */
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
                : logOutMenuItems.map((item) => (
                    <ListItem key={item.text} /* className={styles.drawerItem} */ disablePadding>
                      <ListItemButton /* className={styles.drawerButton} */ component={Link} to={item.path}>
                        <ListItemIcon sx={{ color: "#705B38", fontSize: "30px" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{ color: "#705B38" }}
                          primaryTypographyProps={{ fontSize: "25px",
                            /* fontFamily: "LXGW WenKai Mono TC, monospace",
                            fontWeight: "400px",
                            fontStyle: "normal", */ 
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
          </Box>
          {currentUser ? (
            <div className={styles.btnBox}>
              <button
                style={{ width: "80%" }}
                onClick={handleLogout}
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                登出
              </button>
            </div>
          ) : null}
          <img
            style={{ marginTop: "50px" }}
            src={sideDrawerPic}
            alt="sideDrawerPic"
          ></img>
        </div>
      </Drawer>
    </div>
  );
}
