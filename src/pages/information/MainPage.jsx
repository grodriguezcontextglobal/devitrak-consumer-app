import { Grid, Typography } from "@mui/material";
import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { eventInfoDetail, contactInfo } = useSelector((state) => state.event);
  return (
    <Grid container>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        alignSelf={"stretch"}
        justifyContent={"center"}
        item
        xs={11}
        margin={"10px auto 0px"}
      >
        <Card
          key={"article?.title"}
          style={{
            marginTop: 16,
            marginBottom: "15dvh",
            width: "100%",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
          }}
        >
          <Grid container>
            <Grid margin={'0.5rem auto'} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={'center'}
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={600}
                lineHeight={"24px"}
                color={"var(--gray-700, #344054)"}
              >
                {eventInfoDetail.eventName}
              </Typography>
            </Grid>
            <Grid margin={'0.5rem auto'} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"var(--gray-700, #344054)"}
              >
                {eventInfoDetail.address}
              </Typography>
            </Grid>
            <Grid margin={'0.5rem auto'} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"var(--gray-700, #344054)"}
              >
                {Date(eventInfoDetail.dateBegin)}
              </Typography>
            </Grid>
            <Grid margin={'0.5rem auto'} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"var(--gray-700, #344054)"}
              >
                {Date(eventInfoDetail.dateEnd)}
              </Typography>
            </Grid>
            <Grid margin={"1rem auto"} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"20px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"28px"}
                color={"var(--gray-700, #344054)"}
              >
                Contact person
              </Typography>
            </Grid>
            <Grid margin={'0.5rem auto'} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"var(--gray-700, #344054)"}
              >
                {contactInfo.name}
              </Typography>
            </Grid>
            <Grid margin={'0.5rem auto'} item xs={12}>
              {" "}
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"var(--gray-700, #344054)"}
              >
                {contactInfo.email}
              </Typography>
            </Grid>
            <Grid margin={'0.5rem auto 0.5rem'} item xs={12}>
              <Typography
                textTransform={"none"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                color={"var(--gray-700, #344054)"}
              >
                {contactInfo.phone}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MainPage;
