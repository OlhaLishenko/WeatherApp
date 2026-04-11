import Content from "@/components/Content";
import Header from "@/components/header";
import MainText from "@/components/MainText";
import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: colors.blueDark, paddingInline: 16 }}
      >
        <Header />
        <View style={styles.main}>
          <MainText />
          <Content />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blueDark,
    // padding: 16,
    minHeight: "100%",
    flexDirection: "column",
    gap: 48,
  },
});
