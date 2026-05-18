import { colors } from "@/constants/colors";
import { customStyles } from "@/styles/customStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const arrowIcon = require("@/assets/images/icon-arrow.png");

export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRoute();
  const navigate = useNavigation();
  const navText = route.name === "Forecast" ? "Weather" : "Map";

  return (
    <SafeAreaView style={{ flex: 1 }} onStartShouldSetResponder={() => false}>
      <LinearGradient
        colors={[colors.secondaryBgBlue, colors.mainBgBlue]}
        style={{ flex: 1 }}
        start={[1, 0]}
        end={[3, 1]}
        locations={[0, 1]}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: "column",
            gap: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <View style={customStyles.navContainer}>
              <Image source={arrowIcon} style={{ width: 24, height: 24 }} />
              <Text style={customStyles.navText}>{navText}</Text>
            </View>
          </TouchableOpacity>
          {children}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
