import { BottomNavigation, Grid, Typography } from "@mui/material";
import { Progress } from "antd";
import "./IndicatorProgressBottom.css";
import "./BottomNavigation.css";
import { useSelector } from "react-redux";

const IndicatorProgressBottom = () => {
  const urlDetector = window.location.pathname;

  const { multipleDeviceSelection } = useSelector(
    (state) => state.deviceHandler
  );
  const { eventInfoDetail } = useSelector((state) => state.event)
  const { deviceSetup } = useSelector((state) => state.event);
  const sumOfDevicesNeeded = () => {
    let result = [];
    const findValue = deviceSetup.map((device) => {});
    return 0;
  };
  const stepIndicator = () => {
    let current;
    switch (urlDetector) {
      case "/initial-form":
        return (current = 25);
      case "/device-selection":
        return (current = 50);
      case "/deposit":
        return (current = 75);
      case "/confirmation-process":
        return (current = 100);
    }
    return current;
  };

  return (
    <BottomNavigation
      className="bottom-navigation"
      sx={{
        display: "flex",
        width: "100%",
        // height: "cal(10dvh - 100dvh)",
        padding: "32px 0px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
        borderRadius: "20px 20px 0px 0px",
        background: "var(--base-white, #fff)",
        boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {urlDetector === "/device-selection" && eventInfoDetail.merchant && (
        <Grid
          style={{
            margin: "1.5rem 0 0.5rem 0",
          }}
          container
        >
          <Grid item xs={12}>
            <Typography
              color={"var(--gray-900, #101828)"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"24px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"32px"}
              padding={"25px 0px 10px 0px"}
            >
              Total deposit: ${sumOfDevicesNeeded()}
            </Typography>
            <Typography
              color={"var(--gray-600, #475467)"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"24px"}
            >
              We will collect your deposit on the next page.
            </Typography>
          </Grid>
        </Grid>
      )}
      <Progress
        steps={4}
        percent={stepIndicator()}
        showInfo={false}
        size={[85, 10]}
      />
    </BottomNavigation>
  );
};

export default IndicatorProgressBottom;
