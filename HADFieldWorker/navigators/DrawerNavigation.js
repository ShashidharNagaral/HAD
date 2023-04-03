import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RecordsScreen from "../screen/RecordsScreen";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../utils/Color";
import Dashboard from "../screen/Dashboard";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
function DrawerNavigation(props) {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => {
          return (
            <Feather
              style={{
                marginLeft: 14,
              }}
              name="sidebar"
              color={COLOR.primaryColor}
              size={28}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
        headerTitleStyle: {
          marginLeft: Platform.OS === "android" ? 0 : 0,
        },
        drawerActiveTintColor: COLOR.primaryColor,
        drawerActiveBackgroundColor: COLOR.backgroundColor,
      })}
    >
      <Drawer.Screen
        options={{
          headerTitle: "Patient Follow-Up",
          title: "Dashboard",
          headerRight: ({}) => {
            return (
              <MaterialCommunityIcons
                style={{ paddingRight: 14 }}
                name="sync"
                color={COLOR.primaryColor}
                size={28}
              />
            );
          },
        }}
        name="dashboard"
        component={Dashboard}
      />
      <Drawer.Screen
        options={{
          headerTitle: "Follow-Up Records",
          title: "Records",
        }}
        name="recordScreen"
        component={RecordsScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;