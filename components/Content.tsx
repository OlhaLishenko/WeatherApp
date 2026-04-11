import Search from "@/assets/images/icon-search.svg";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

import { ui } from "@/constants/ui";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import InfoBlock from "./InfoBlock";

export default function Content() {
  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 32 }}>
      <View
        style={{
          flexDirection: "column",
          gap: 12,
        }}
      >
        <View style={styles.searchInput}>
          <Search width={20} height={20} />
          <TextInput
            style={styles.input}
            placeholder='Search for a place...'
            placeholderTextColor={colors.mainText}
            underlineColorAndroid='transparent'
          />
        </View>

        <TouchableOpacity style={styles.buttonSearch}>
          <Text style={styles.buttonSearchText}>Search</Text>
        </TouchableOpacity>
      </View>
      <InfoBlock />
    </View>
  );
}
const styles = StyleSheet.create({
  searchInput: {
    ...fonts.dmSantStatic,
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: colors.blueElementsLight,
    paddingInline: 24,
    gap: 16,
    alignItems: "center",
    height: ui.searchHeight,
  },

  input: {
    flex: 1,
    color: colors.mainText,
    fontSize: 20,
    fontWeight: 500,
  },

  buttonSearch: {
    borderRadius: 12,
    backgroundColor: colors.darkBlueElements,
    height: ui.searchHeight,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSearchText: {
    ...fonts.dmSantStatic,
    color: colors.mainText,
    fontSize: 20,
    fontWeight: 600,
    borderRadius: 12,
  },
});
