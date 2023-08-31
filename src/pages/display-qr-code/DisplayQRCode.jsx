import { nanoid } from "@reduxjs/toolkit";
import { Avatar, Divider, List, QRCode } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import { Grid, Typography } from "@mui/material";

const DisplayQRCode = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { multipleDeviceSelection } = useSelector(
    (state) => state.deviceHandler
  );
  const { choice, company } = useSelector((state) => state.event);
  const paymentIntentValueRef = useRef(null);
  const foundTotalDeviceNumber = () => {
    const number = multipleDeviceSelection?.map((total) =>
      parseInt(total.deviceNeeded)
    );
    return number.reduce((accumulator, current) => accumulator + current, 0);
  };
  foundTotalDeviceNumber();
  const generatePaymentIntentForNoDepositRequired = async () => {
    const max = 918273645;
    const transactionGenerated = "pi_" + nanoid(12);
    paymentIntentValueRef.current = transactionGenerated;
    const { data } = await devitrackApi.post(
      "/stripe/stripe-transaction-no-regular-user",
      {
        paymentIntent: transactionGenerated,
        clientSecret:
          transactionGenerated +
          "_client_secret_" +
          Math.floor(Math.random() * max),
        device: foundTotalDeviceNumber(),
        user: consumer?.id,
        provider: company,
        eventSelected: choice,
      }
    );
    if (data) {
      await devitrackApi.post("/stripe/save-transaction", {
        paymentIntent: transactionGenerated,
        clientSecret:
          transactionGenerated +
          "_client_secret_" +
          Math.floor(Math.random() * max),
        device: [multipleDeviceSelection],
        consumerInfo: consumer,
        provider: company,
        eventSelected: choice,
      });
    }
  };
  return (
    <>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        container
      >
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <QRCode
            errorLevel="H"
            value={
              paymentIntentValueRef.current
                ? paymentIntentValueRef.current
                : "https://devitrak.com"
            }
            icon="../../assets/devitrak_logo.svg"
          />
        </Grid>
        <Grid margin={"1rem auto"} item xs={12}>
          <Typography
            textTransform={"none"}
            color={"var(--gray-900, #101828)"}
            textAlign={"left"}
            /* Display xs/Semibold */
            fontFamily={"Inter"}
            fontSize={"24px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"32px"}
          >
            Order completed
          </Typography>
        </Grid>
        <Divider />
        <List
          style={{
            width: "90%",
          }}
          itemLayout="horizontal"
          dataSource={multipleDeviceSelection}
          renderItem={(item) => (
            <List.Item
              actions={[<p key="list-loadmore-more">{item.deviceNeeded}</p>]}
            >
              <List.Item.Meta
                avatar={<Avatar src={"../../assets/devitrak_logo.svg"} />}
                title={<a href="https://ant.design">{item.deviceType}</a>}
              />
            </List.Item>
          )}
        />
        <Grid item xs={12}></Grid>
      </Grid>
      
    </>
  );
};

export default DisplayQRCode;
