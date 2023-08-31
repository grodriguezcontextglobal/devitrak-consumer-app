import { Icon } from "@iconify/react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBottom = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Paper
      variant="outlined"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: "10dvh",
      }}
      elevation={4}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => navigate("/profile")}
          label="Device"
          icon={<Icon icon="ph:devices-thin" width="20" height="20" />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/instructions")}
          label="Information"
          icon={<Icon icon="maki:information" width="20" height="20" />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/instructions")}
          label="Instructions"
          icon={<Icon icon="tabler:calendar-event" width="20" height="20" />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/profile")}
          label="Profile"
          icon={
            <Icon icon="healthicons:person-outline" width="20" height="20" />
          }
        />
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationBottom;
