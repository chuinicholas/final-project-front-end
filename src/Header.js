import { useState, useEffect, useRef, React } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import DrawerComponent from "./components/DrawerComponent";
import Avatar from "@mui/material/Avatar";
// import HomeIcon from "@mui/icons-material/Home";
import HomeIcon from "./image/fav.png"
import { grey } from "@mui/material/colors";
import { useAuth } from "./components/contexts/AuthContext";
import { auth } from "./components/firebase";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import 'animate.css';

const Header = ({ scrollPosition_root, chosenFoods }) => {
  const [animate, setAnimate] = useState(false);
  const { currentUser } = useAuth();
  const headerBarRef = useRef();
  const headerBarContentRef = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out!");
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  }

  const handleAnimationClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000); // Reset animation class after 1 second
  };

  return (
    <div>
      <div
        ref={headerBarRef}
        className={
          scrollPosition_root && scrollPosition_root > 0
            ? `${styles.headerBar_downing} ${styles.headerBar} `
            : `${styles.headerBar}`
        }
      >
        <div
          ref={headerBarContentRef}
          className={
            scrollPosition_root && scrollPosition_root > 0
              ? `${styles.headerBar_content_downing} ${styles.headerBar_content}`
              : `${styles.headerBar_content}`
          }
        >
          <div className={styles.leftContainer}>
            <Link to="/home">
              <div
                className={`animate__animated ${animate ? 'animate__headShake' : ''}`}
                onClick={handleAnimationClick}
              >
                <div className={styles.flexContainer}>
                  <img src={HomeIcon} alt="Home" style={{ width: '50px', height: '50px' }} />
                  <h1 className="animate__animated animate__headShake">
                    Grab & Go
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className={styles.rightContainer}>
            {currentUser ? (
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ bgcolor: grey[700], width: 32, height: 32 }}
                      >
                        {currentUser.email[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Avatar /> {currentUser.email}
                  </MenuItem>
                  <Divider />
                  <div onClick={handleLogout}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      登出
                    </MenuItem>
                  </div>
                </Menu>
              </div>
            ) : null}

            <DrawerComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
