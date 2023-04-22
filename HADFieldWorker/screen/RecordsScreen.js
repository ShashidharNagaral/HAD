import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Styles } from "../utils/Styles";
import AppointmentCard from "../components/AppointmentCard";
import { COLOR } from "../utils/Color";
import { getMedicalDataFromTable } from "../services/databaseServices";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

function RecordsScreen({ navigation }) {
  const [medicalData, setMedicalData] = useState([]);
  const isFocused = useIsFocused();
  const loadMedicalData = (data) => {
    setMedicalData(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: width / 24,
      },
    });
  }, [navigation]);

  useEffect(() => {
    getMedicalDataFromTable(loadMedicalData)
      .then((success) => {
        // console.log(success);
      })
      .catch((error) => {
        Alert.alert("Sync error!");
      });
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      <FlatList
        style={{
          paddingHorizontal: 20,
        }}
        keyExtractor={(itemData, i) => itemData.v_id}
        data={medicalData}
        renderItem={(itemData) => {
          return (
            <View
              style={{
                padding: 8,
                marginTop: 8,
                flexDirection: "column",
                borderWidth: 1,
                borderRadius: 8,
              }}
            >
              <Text>
                BP:{"\t\t\t\t\t\t\t\t\t\t\t"}
                {itemData.item.bloodPressure}
              </Text>
              <Text>
                SUGAR LEVEL:{"\t\t"}
                {itemData.item.sugarLevel}
              </Text>
              <Text>
                TEMPERATURE:{"\t"} {itemData.item.temperature}
              </Text>
              <Text>
                SpO2:{"\t"} {itemData.item.spo2Level}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default RecordsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: COLOR.backgroundColor,
  },
});
