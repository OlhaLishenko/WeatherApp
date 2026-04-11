import { fonts } from "@/constants/fonts";
import { ui } from "@/constants/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SearchBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {},
});
