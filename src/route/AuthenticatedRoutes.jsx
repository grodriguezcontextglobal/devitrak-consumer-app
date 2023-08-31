import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBottom from "../components/navigation/NavigationBottom";
import IndicatorProgressBottom from "../components/indicatorBottom/IndicatorProgressBottom";
const AuthenticatedRoutes = () => {
  const ConsumerInitialForm = lazy(() =>
    import("../pages/Consumer/ConsumerInitialForm")
  );
  const DeviceSelection = lazy(() => import("../pages/device/DeviceSelection"));
  const Home = lazy(() => import("../pages/home/Home"));
  const InstructionsMainPage = lazy(() =>
    import("../pages/instructions/MainPage")
  );
  const Profile = lazy(() => import("../pages/profile/Profile"));
  const DisplayQRCode = lazy(() =>
    import("../pages/display-qr-code/DisplayQRCode")
  );
  const urlDetector = window.location.pathname;
  return (
    <>
      <body>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/initial-form" element={<ConsumerInitialForm />} />{" "}
            <Route path="/device-selection" element={<DeviceSelection />} />{" "}
            {/* <Route path="/deposit-payment" element={< />} />{" "} */}
            <Route
              path="/qr-code-generation"
              element={<DisplayQRCode />}
            />{" "}
            <Route path="/instructions" element={<InstructionsMainPage />} />{" "}
            <Route path="/profile" element={<Profile />} />{" "}
          </Routes>{" "}
        </Suspense>
      </body>

      {(urlDetector === "/initial-form" ||
        urlDetector === "/device-selection" ||
        urlDetector === "/deposit-payment") ? <footer>
        <IndicatorProgressBottom />
      </footer> :  (
        <footer>
          <NavigationBottom />
        </footer>
      )}
    </>
  );
};

export default AuthenticatedRoutes;
