import React from "react";
import { useHistory, Link } from "react-router-dom";
import PortraitIcon from "@mui/icons-material/Portrait";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import GrainIcon from "@mui/icons-material/Grain";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function NavigationBar() {
  const history = useHistory();
  return (
    <div>
      <Breadcrumbs className="bg-white p-2" align="center">
        <Link
          underline="hover"
          style={{ display: "flex", alignItems: "center", color: "inherit" }}
          color="inherit"
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          style={{ display: "flex", alignItems: "center", color: "inherit" }}
          color="inherit"
          to="/settings"
        >
          <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Settings
        </Link>
      </Breadcrumbs>
    </div>
  );
}
