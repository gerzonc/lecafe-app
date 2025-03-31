import colors from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import BubbleIcon from "./icons/bubble";
import LecafeIcon from "./icons/lecafe";
import LogoutIcon from "./icons/logout";
import PersonIcon from "./icons/person";
import SettingsIcon from "./icons/settings";
import StoriesIcon from "./icons/stories";
import MenuItem from "./menu-item";
import Text from "./text";

const MESSAGE_QUANTITY = 2;

export default function DrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation();

  const handleCloseDrawer = () =>
    navigation.dispatch(DrawerActions.closeDrawer());
  return (
    <ScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.header}>
        <Pressable style={styles.closeBtn} onPress={handleCloseDrawer}>
          <View>
            <MaterialIcons name="close" size={24} color={colors.white} />
          </View>
        </Pressable>
        <Image
          source={require("../assets/images/ui/profile-image.png")}
          style={styles.profileImage}
        />
        <Text fontFamily="maven-pro" fontSize={20} weight="bold">
          Andrea, 20
        </Text>
        <Text fontFamily="quicksand" fontSize={12} weight="bold">
          Surco
        </Text>
      </View>
      <View style={styles.drawerItemsContainer}>
        <View style={styles.selectedItemContainer}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.17)"
            }}
          />
          <MenuItem text="Lecafé" customIcon={<LecafeIcon />} />
        </View>
        <MenuItem
          text="Mensajes"
          customIcon={
            <View>
              <View style={styles.bubbleBadge}>
                <Text fontFamily="maven-pro" fontSize={12} weight="bold">
                  {MESSAGE_QUANTITY}
                </Text>
              </View>
              <BubbleIcon />
            </View>
          }
        />
        <MenuItem text="Matches" iconName="heart-outline" />
        <MenuItem text="Mi Perfil" customIcon={<PersonIcon />} />
        <MenuItem text="Tutorial" customIcon={<StoriesIcon />} />
        <MenuItem text="Ajustes" customIcon={<SettingsIcon />} />
      </View>
      <View style={styles.footerContainer}>
        <MenuItem text="Cerrar sesión" customIcon={<LogoutIcon />} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.pastelPink,
    paddingVertical: 24
  },
  header: {
    alignItems: "center",
    paddingVertical: 45
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 40
  },
  drawerItemsContainer: {
    marginTop: 10
  },
  bubbleBadge: {
    position: "absolute",
    backgroundColor: colors.hotPink,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 16,
    width: 16,
    top: -4,
    right: -4,
    zIndex: 2
  },
  selectedItemContainer: {
    width: "100%"
  },
  closeBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 24
  },
  footerContainer: {
    flex: 1,
    paddingBottom: 42,
    justifyContent: "center"
  }
});
