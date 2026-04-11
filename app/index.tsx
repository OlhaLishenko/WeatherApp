import MainText from "@/components/MainText";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

export default function InitScreen() {
  const router = useRouter();
  const [spinner, setSpinner] = useState(true);

  const wait = (timer: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timer);
    });
  };

  useEffect(() => {
    wait(3000).then(() => {
      setSpinner(false);
      router.navigate("/main");
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.main}>
            {spinner && (
              <Spinner
                visible={spinner}
                textContent={"Loading..."}
                textStyle={styles.spinnerTextStyle}
                animation='slide'
                overlayColor={colors.overlayBlueDark}
              />
            )}
            <View style={styles.mainTextContainer}>
              <MainText />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.blueDark,
  },

  main: {
    height: "100%",
    flexDirection: "column",
  },

  mainTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  spinnerTextStyle: {
    color: "#FFF",
  },
});
