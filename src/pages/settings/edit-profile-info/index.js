import React, { useEffect, useState } from "react";
import NavigationBar from "../../../components/Navigation";

// Material UI imports
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import InputAdornment from "@mui/material/InputAdornment";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// Evergreen UI imports
import { Spinner } from "evergreen-ui";

// Fetch User Information
import { getUser } from "../../../lib/data-fetching/users-data";
import { states } from "../../../lib/data/states";
import { age } from "../../../lib/data/age";
import { rates } from "../../../lib/data/rates";

// Validations
import { Button } from "@mui/material";
import { updateUserInfo } from "../../../lib/data-upload/updateUser";

export default function EditProfileInfo() {
  const [userData, setUserData] = useState();
  const [updatedData, setUpdatedData] = useState({
    state: "",
    bio: "",
    age: "",
    phone_number: "",
    whatsapp_number: "",
    short_time: "",
    over_night: "",
    weekend: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [info, setInfo] = useState();

  const handlePhoneNumber = (event) => {
    if (!isNaN(event.target.value)) {
      setError(null);
      setUpdatedData({
        ...updatedData,
        phone_number: event.target.value,
      });
    } else {
      setError("Phone Number is InValid");
    }
  };

  const handleWhatsappNumber = (event) => {
    if (!isNaN(event.target.value)) {
      setError(null);
      setUpdatedData({
        ...updatedData,
        whatsapp_number: event.target.value,
      });
    } else {
      setError("Whatsapp Number is InValid");
    }
  };

  const handleSubmit = async () => {
    // Check for Error then return
    if (error) {
      setError("Invalid Inputs, Please Re-try");
      return;
    }

    const state = updatedData.state || userData.state;
    const age = updatedData.age || userData.age;
    const bio = updatedData.bio || userData.bio;
    const phone = updatedData.phone_number || userData.phone_number_1;
    const whatsapp = updatedData.whatsapp_number || userData.whatsapp_number;
    const short = updatedData.short_time || userData.shorttime;
    const overnight = updatedData.over_night || userData.overnight;
    const weekend = updatedData.weekend || userData.weekend_rate;

    const result = await updateUserInfo(
      state,
      age,
      phone,
      whatsapp,
      short,
      overnight,
      weekend,
      bio,
      userData.id
    );

    if (result === "success") {
      setError(null);
      setInfo(null);
      setSuccess("Updated Successfully");
    } else {
      setSuccess(null);
      setError(null);
      setInfo("Network Error - Please Re-try");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const results = await getUser();
      setUserData(results[0]);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <p className="m-5" align="center">
        <Spinner />
      </p>
    );
  }

  console.log(userData);

  return (
    <div>
      <NavigationBar />

      <div className=" m-2">
        <div className="text-xl mt-2" align="center">
          <EditIcon /> Edit Profile Info
          <br />
          <Chip
            icon={<FaceIcon />}
            label={userData.displayname}
            variant="outlined"
            color="info"
          />
        </div>

        <div className="m-5">
          <TextField
            id="outlined-select-currency"
            select
            label="Edit State"
            defaultValue={userData.state}
            helperText="Please select your current State"
            fullWidth
            style={{ marginBottom: "20px" }}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, state: event.target.value })
            }
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Edit Age"
            defaultValue={userData.age}
            helperText="Please select your current Age"
            fullWidth
            onChange={(event) =>
              setUpdatedData({ ...updatedData, age: event.target.value })
            }
          >
            {age.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            style={{ marginTop: "20px" }}
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={4}
            fullWidth
            defaultValue={userData.bio}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, bio: event.target.value })
            }
          />

          <TextField
            style={{ marginTop: "20px" }}
            label="Phone Number"
            id="outlined-start-adornment"
            fullWidth
            defaultValue={userData.phone_number_1}
            onChange={handlePhoneNumber}
            InputProps={{
              inputMode: "numeric",
              startAdornment: (
                <InputAdornment position="start">+234</InputAdornment>
              ),
            }}
          />

          <TextField
            style={{ marginTop: "20px" }}
            label="WhatsApp Number"
            id="outlined-start-adornment"
            fullWidth
            defaultValue={userData.whatsapp_number}
            onChange={handleWhatsappNumber}
            InputProps={{
              inputMode: "numeric",
              startAdornment: (
                <InputAdornment position="start">+234</InputAdornment>
              ),
            }}
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Short Time Rate"
            defaultValue={userData.shorttime}
            helperText="Please select your Short Time Rate"
            fullWidth
            style={{ marginTop: "20px" }}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, short_time: event.target.value })
            }
          >
            {rates.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="OverNight Rate"
            defaultValue={userData.overnight}
            helperText="Please select your Over Night Rate"
            fullWidth
            style={{ marginTop: "20px" }}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, over_night: event.target.value })
            }
          >
            {rates.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Weekend Rate"
            defaultValue={userData.weekend_rate}
            helperText="Please select your Weekend Rate"
            fullWidth
            style={{ marginTop: "20px" }}
            onChange={(event) =>
              setUpdatedData({ ...updatedData, weekend: event.target.value })
            }
          >
            {rates.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {error && (
          <p>
            <Stack sx={{ width: "100%" }} spacing={2} marginBottom={3}>
              <Alert severity="warning">{error}</Alert>
            </Stack>
          </p>
        )}

        {success && (
          <p>
            <Stack sx={{ width: "100%" }} spacing={2} marginBottom={3}>
              <Alert severity="success">{success}</Alert>
            </Stack>
          </p>
        )}

        {info && (
          <p>
            <Stack sx={{ width: "100%" }} spacing={2} marginBottom={3}>
              <Alert severity="info">{info}</Alert>
            </Stack>
          </p>
        )}

        <div align="center">
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}
