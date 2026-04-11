import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { NavList } from "@/types/NavList";

const navList: NavList = [
  { id: "1", title: "Home", link: "/main" },
  { id: "2", title: "Daily", link: "/main/daily" },
  // { id: "3", title: "Hourly", link: "main/" },
];

export default function Menu() {
  return (
    <FlatList
      data={navList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Link href={item.link}>
          <Text>{item.title}</Text>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({});
