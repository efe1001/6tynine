import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PortraitIcon from "@mui/icons-material/Portrait";
import CollectionsIcon from "@mui/icons-material/Collections";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";
import MediaCard from "./components/media-card";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import NavigationBar from "../../components/Navigation";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

export default function Settings() {
  const email = localStorage.getItem("email");

  return (
    <>
      <div className="bg-white" style={{ zIndex: "1" }}>
        <div>
          <NavigationBar />
        </div>

        <div align="center">
          <Chip
            icon={<FaceIcon />}
            label={email}
            variant="outlined"
            color="success"
          />
        </div>

        <MediaCard
          title="Promote Your Account"
          description="Stand out from other Escorts when you promote your account"
          link="/promoteyouraccount"
        />

        <MediaCard
          title="Verify Your Account"
          description="Prove your the one behind the profile. Verified accounts get  more views and calls from clients"
          link="/verifyyouraccount"
        />

        <div>
          <List sx={style} aria-label="mailbox folders">
            <Divider light />
            <Link to="/changeprofilepicture" style={{ color: "inherit" }}>
              <ListItem button divider>
                <PortraitIcon className="m-2" />{" "}
                <ListItemText primary="Change Profile Picture" />
              </ListItem>
            </Link>

            <Link to="/addgalleryimages" style={{ color: "inherit" }}>
              <ListItem button divider>
                <CollectionsIcon className="m-2" />{" "}
                <ListItemText primary="Add Gallery Pictures" />
              </ListItem>
            </Link>
            <Link to="/deletegalleryimages" style={{ color: "inherit" }}>
              <ListItem button divider>
                <DeleteForeverIcon className="m-2" />
                <ListItemText primary="Delete Gallery Pictures" />
              </ListItem>
            </Link>
            <Link to="/editprofileinfo" style={{ color: "inherit" }}>
              <ListItem button divider>
                <EditIcon className="m-2" />
                <ListItemText primary="Edit Profile Information (Bio, Age, State, Phone Number, Rates)" />
              </ListItem>
            </Link>
          </List>
        </div>
      </div>
    </>
  );
}
