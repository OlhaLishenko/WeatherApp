import Arrow from "@/assets/images/icon-dropdown.svg";
import SettingsIcon from "@/assets/images/icon-units.svg";
import Logo from "@/assets/images/logo.svg";
import MenuIcon from "@/assets/images/menu-icon.svg";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Link, useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon width={32} height={32} color={colors.mainText} />
        </TouchableOpacity>
        <Logo width={137} height={28} />
        <TouchableOpacity
          accessibilityLabel='Settings'
          activeOpacity={0.7}
          style={styles.buttonSettings}
        >
          <View style={styles.buttonContainer}>
            <SettingsIcon width={14} height={14} />
            <Text style={{ color: "#fff" }}>Units</Text>
            <Arrow width={9} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.blueDark,
    padding: 16,
    minHeight: "100%",
    flexDirection: "column",
    gap: 48,
    overflowX: "scroll",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonSettings: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: colors.blueElements,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingBlock: 10,
    paddingInline: 10,
  },

  buttonContainer: {
    color: colors.mainText,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    ...fonts.dmSantStatic,
    fontSize: 14,
    color: colors.mainText,
  },
});
