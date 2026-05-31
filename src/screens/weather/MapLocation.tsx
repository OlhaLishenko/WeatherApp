import { findCityByCoordinates } from "@/api/findCityByCoordinates";
import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/fontsConfiguration";
import { actions as searchCityAction } from "@/store/searchCity";
import { fetchNewCityTemp } from "@/store/searchCityTempSlice";
import { customStyles } from "@/styles/customStyles";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { RootListType } from "@/types/RootListType";
import { getDelta } from "@/utils/getDelta";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MapView, {
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import WeatherLayout from "./layout";

export default function MapLocation() {
  const coordinates = useAppSelector((state) => state.coordinates);
  const searchCityTemp = useAppSelector((state) => state.searchCityTemp);
  const searchCity = useAppSelector((state) => state.searchCity);
  const dispatch = useAppDispatch();
  const { latitude: currentLatitude, longitude: currentLongitude } =
    coordinates.data;
  const navigation = useNavigation<NativeStackNavigationProp<RootListType>>();

  const [isModal, setIsModal] = useState(false);
  const [coords, setCoords] = useState<LatLng>({
    latitude: currentLatitude,
    longitude: currentLongitude,
  });
  const [temporaryCoords, setTemporaryCoords] = useState<LatLng>({
    latitude: currentLatitude,
    longitude: currentLongitude,
  });
  const [error, setError] = useState<string>("");
  const { height } = useWindowDimensions();

  const {
    latitudeDelta: currentLatitudeDelta,
    longitudeDelta: currentLongitudeDelta,
  } = getDelta(currentLatitude);

  const initialCoords = {
    latitude: currentLatitude,
    longitude: currentLongitude,
    latitudeDelta: currentLatitudeDelta,
    longitudeDelta: currentLongitudeDelta,
  };

  const handleMapPress = (e: LongPressEvent) => {
    const coords = e.nativeEvent.coordinate;
    if (coords === null) {
      setError("Can't set this location. Try again");
    }
    setTemporaryCoords(coords);
    setIsModal(true);
  };

  const handleSubmitChangeLocation = async () => {
    setCoords(temporaryCoords);

    const { city, country, timezone } = await findCityByCoordinates(
      coords.latitude,
      coords.longitude,
    );

    const newLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      city: city,
      country: country,
      timezone: timezone,
    };

    console.log(newLocation);

    dispatch(searchCityAction.setData(newLocation));
    dispatch(fetchNewCityTemp());
    setIsModal(false);

    navigation.navigate("Forecast");
  };

  const handleDiscardChangeLocation = () => {
    setIsModal(false);
  };

  const buttonOptions = [
    { title: "Yes", handleClick: handleSubmitChangeLocation },
    { title: "No", handleClick: handleDiscardChangeLocation },
  ];

  return (
    <WeatherLayout>
      {isModal && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModal}
          onRequestClose={() => {
            setIsModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Do you want to change this location?
              </Text>

              <View style={{ flexDirection: "row", gap: 20 }}>
                {buttonOptions.map((button) => (
                  <Pressable
                    onPress={() => setIsModal(false)}
                    style={styles.button}
                    key={button.title}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={styles.modalText}
                        onPress={button.handleClick}
                      >
                        {button.title}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      )}
      <View>
        <Text style={customStyles.textSmall}>
          📍Hold your finger on the map to select a new location
        </Text>
      </View>
      <View
        style={{
          height: height * 0.8,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 20,
          overflow: "hidden",
          ...customStyles.shadow,
        }}
      >
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialCoords}
          userInterfaceStyle='dark'
          onLongPress={handleMapPress}
          moveOnMarkerPress={false}
        >
          <Marker coordinate={coords} />
        </MapView>
      </View>
    </WeatherLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    flexDirection: "column",
    gap: 20,
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontFamily: Fonts.family.regular,
    fontWeight: 500,
    fontSize: Fonts.size.h6,
    textAlign: "center",
  },

  button: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: colors.buttonColor,
  },
});
