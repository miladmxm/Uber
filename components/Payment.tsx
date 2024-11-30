import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const Payment = () => {
  const openPaymentSheet = async () => {};
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        onPress={openPaymentSheet}
        className="my-10"
      />
    </>
  );
};

export default Payment;
