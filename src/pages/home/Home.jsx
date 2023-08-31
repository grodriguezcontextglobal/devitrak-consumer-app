import { useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  onAddContactInfo,
  onAddDeviceSetup,
  onAddEventData,
  onAddEventInfoDetail,
  onAddEventStaff,
  onAddSubscriptionInfo,
  onSelectCompany,
  onSelectEvent,
} from "../../store/slides/eventSlide";
import { Grid, Typography } from "@mui/material";

const Home = () => {
  const [existingEvent, setExistingEvent] = useState(false);
  const eventUrl = new URLSearchParams(window.location.search).get("event");
  const companyUrl = new URLSearchParams(window.location.search).get("company");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listOfEventsQuery = useQuery({
    queryKey: ["listOfEvents"],
    queryFn: () => devitrackApi.get("/event/event-list"),
  });
  const foundEventInfo = useCallback(() => {
    const finding = listOfEventsQuery?.data?.data?.list?.find(
      (event) =>
        event.eventInfoDetail.eventName === eventUrl &&
        event.company === companyUrl
    );
    return finding;
  }, [
    listOfEventsQuery.isLoading,
    listOfEventsQuery.data,
    companyUrl,
    eventUrl,
  ]);
  foundEventInfo();
  const addEventInfoAndNavigate = () => {
    if (foundEventInfo()) {
      dispatch(onAddEventData(foundEventInfo()));
      dispatch(onAddEventInfoDetail(foundEventInfo().eventInfoDetail));
      dispatch(onAddEventStaff(foundEventInfo().staff));
      dispatch(onSelectEvent(foundEventInfo().eventInfoDetail.eventName));
      dispatch(onSelectCompany(foundEventInfo().company));
      dispatch(onAddDeviceSetup(foundEventInfo().deviceSetup));
      dispatch(onAddContactInfo(foundEventInfo().contactInfo));
      dispatch(onAddSubscriptionInfo(foundEventInfo().subscription));
      navigate("/initial-form");
      // if (foundEventInfo()?.active === false) {
      //   return setExistingEvent(true);
      // } else {
      //   dispatch(onAddEventData(foundEventInfo()));
      //   dispatch(onAddEventInfoDetail(foundEventInfo().eventInfoDetail));
      //   dispatch(onAddEventStaff(foundEventInfo().staff));
      //   dispatch(onSelectEvent(foundEventInfo().eventInfoDetail.eventName));
      //   dispatch(onSelectCompany(foundEventInfo().company));
      //   dispatch(onAddDeviceSetup(foundEventInfo().deviceSetup));
      //   dispatch(onAddContactInfo(foundEventInfo().contactInfo));
      //   dispatch(onAddSubscriptionInfo(foundEventInfo().subscription));
      //   navigate("/initial-form");
      // }
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    addEventInfoAndNavigate();
    return () => {
      controller.abort();
    };
  }, [listOfEventsQuery.isLoading, listOfEventsQuery.data]);

  if (listOfEventsQuery.data) {
    return (
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"2rem auto"}
        container
      >
        <Grid
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={10}
          margin={"15rem 0"}
        >
          {" "}
          <Typography
            color={"var(--gray-900, #101828)"}
            textAlign={"center"}
            /* Display xs/Semibold */
            fontFamily={"Inter"}
            fontSize={"20px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"30px"}
            style={{
              textWrap: "balance",
            }}
          >
            Welcome to Devitrak App
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={10}
          margin={"2rem auto"}
        >
          {" "}
          <Typography
            color={"var(--gray-900, #101828)"}
            textAlign={"center"}
            /* Display xs/Semibold */
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={500}
            lineHeight={"24px"}
            style={{
              textWrap: "balance",
            }}
          >
            {!existingEvent
              ? "Please wait while we take you to the main page of the event"
              : "There is not event related to the url used"}
          </Typography>
        </Grid>
      </Grid>
    );
  }
};

export default Home;
