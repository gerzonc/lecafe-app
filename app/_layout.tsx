import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import MenuIcon from '@/components/menu';
import { Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import colors from '@/constants/colors';

export default function Layout() {
  const navigation = useNavigation()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Drawer screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "",
        drawerStyle: {
          width: '54%',
        },
        sceneStyle: {
          backgroundColor: colors.pastelPink
        },
        headerTransparent: true,
        headerTitle: '',
      }}>
        <Drawer.Screen name="index" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
