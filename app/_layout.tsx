import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: "",
          drawerStyle: {
            width: "54%",
            backgroundColor: colors.pastelPink
          },
          sceneStyle: {
            backgroundColor: colors.pastelPink
          },
          headerTransparent: true,
          headerTitle: ""
        }}
      >
        <Drawer.Screen name="index" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
