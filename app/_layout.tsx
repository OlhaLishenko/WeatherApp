import Bricolade from "@/assets/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf";
import BricoladeBold from "@/assets/fonts/Bricolage_Grotesque/static/BricolageGrotesque-Bold.ttf";
import DMSantItalic from "@/assets/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf";
import DMSantStatic from "@/assets/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const fontsStorage = {
  bricolade: Bricolade,
  bricoladeBold: BricoladeBold,
  dmSantStatic: DMSantStatic,
  dmSantItalic: DMSantItalic,
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
