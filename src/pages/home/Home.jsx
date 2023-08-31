import { useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
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
import { Grid } from "@mui/material";

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
  console.log("foundEventInfo() ", foundEventInfo());
  if (listOfEventsQuery.data) {
    const addEventInfoAndNavigate = () => {
      if (foundEventInfo()?.company === "") {
        return setExistingEvent(true);
      } else if (foundEventInfo()?.active === false) {
        return setExistingEvent(true);
      } else {
        dispatch(onAddEventData(foundEventInfo()));
        dispatch(onAddEventInfoDetail(foundEventInfo().eventInfoDetail));
        dispatch(onAddEventStaff(foundEventInfo().staff));
        dispatch(onSelectEvent(foundEventInfo().eventInfoDetail.eventName));
        dispatch(onSelectCompany(foundEventInfo().company));
        dispatch(onAddDeviceSetup(foundEventInfo().deviceSetup));
        dispatch(onAddContactInfo(foundEventInfo().contactInfo));
        dispatch(onAddSubscriptionInfo(foundEventInfo().subscription));
        navigate("/initial-form");
      }
    };
    addEventInfoAndNavigate();

    return (
      <Grid container>
        <Grid item xs={12}>
          Home
        </Grid>
        <Grid item xs={12}>
          {!existingEvent
            ? "Please wait while we take you to the main page of the event"
            : "There is not event related to the url used"}
        </Grid>
      </Grid>
    );
  }
};

export default Home;
