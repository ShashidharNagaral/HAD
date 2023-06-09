import React from "react";
import { COLOR } from "../utils/Color";
import { Dimensions, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

function ContactCard({ contactNumber }) {
  return (
    <View
      style={{
        borderRadius: 8,
        flexDirection: "row",
        backgroundColor: COLOR.backgroundColor,
      }}
    >
      <View
        style={{
          padding: 8,
        }}
      >
        <Ionicons name="call" color={COLOR.primaryColor} size={16} />
      </View>
      <View
        style={{
          justifyContent: "center",
          paddingRight: 8,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: width / 34,
            fontWeight: "500",
          }}
        >
          {contactNumber}
        </Text>
      </View>
    </View>
  );
}

export default ContactCard;
