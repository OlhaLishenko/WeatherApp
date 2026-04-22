import { useFonts } from "expo-font";
import Bricolade from "@/assets/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf";
import BricoladeBold from "@/assets/fonts/Bricolage_Grotesque/static/BricolageGrotesque-Bold.ttf";
import DMSantItalic from "@/assets/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf";
import DMSantStatic from "@/assets/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf";
import MainText from "@/components/MainText";
import { loadCoordinates } from "@/store/coordinatesSlice";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { SplashScreen } from "expo-router";

const fontsStorage = {
  bricolade: Bricolade,
  bricoladeBold: BricoladeBold,
  dmSantStatic: DMSantStatic,
  dmSantItalic: DMSantItalic,
};

export default function InitScreen() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.coordinates);
  const navigation = useNavigation();

  const [loaded, error] = useFonts({
    Bricolade: fontsStorage.bricolade,
    BricoladeBold: fontsStorage.bricoladeBold,
    DMSantStatic: fontsStorage.dmSantStatic,
    DMSantItalic: fontsStorage.dmSantItalic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    const loadAndRedirect = async () => {
      const result = await dispatch(loadCoordinates());

      if (loadCoordinates.fulfilled.match(result)) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          }),
        );
      } else {
        console.error("Data did not load");
      }
    };

    loadAndRedirect();
  }, []);

  return (
    <SafeAreaProvider>
      <View>
        <View style={styles.container}>
          <View style={styles.main}>
            {coordinates.loader && (
              <Spinner
                visible={coordinates.loader}
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
      </View>
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
