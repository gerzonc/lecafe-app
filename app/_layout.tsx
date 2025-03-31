import DrawerContent from "@/components/drawer-content";
import colors from "@/constants/colors";
import { PortalProvider } from "@gorhom/portal";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <StatusBar style="light" />
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: "slide",
            overlayColor: "",
            drawerStyle: {
              width: "52%",
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
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
