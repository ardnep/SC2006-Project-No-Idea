/**
 * @fileoverview Displays information about a saved trip and allows the user to interact with it.
 * @module views/saved-trips/SavedTripInfo
 * @param {object} props.route - The route object containing information about the current route.
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import darkMapStyle from "../../styles/darkMap.json";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  getAllTransports,
  getDefaultTransport,
} from "../../controllers/RouteManager";
import { executeTrip } from "../../controllers/TripExecutor";
import eventBus from "../../models/EventBus";

function SavedTripInfo({ route, navigation }) {
  const { isDarkmode } = useTheme();
  const { trip } = route.params;
  const [inst, setInst] = useState("");
  const [gmap, setGmap] = useState({});
  const [markers, setMarkers] = useState([]);
  const [executionInfo, setExecutionInfo] = useState([]);
  const [transport, setTransportType] = useState(getDefaultTransport());
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const origin = { latitude: trip.srcLat, longitude: trip.srcLong };
  const destination = { latitude: trip.destLat, longitude: trip.destLong };

  const renderTransport = ({ item }) => {
    const transportItem = item;
    return (
      <Button
        text={<FontAwesome5 name={transportItem.displayIcon} size={16} />}
        status="primary"
        style={styles.button}
        outline={transport.name === transportItem.name ? true : false}
        onPress={() => {
          if (transport.type == transportItem.type) {
            transportItem.getPrice(gmap).then((executionPrice) => {
              setExecutionInfo([gmap.duration, gmap.distance, executionPrice]);
            });
          }
          setTransportType(transportItem);
        }}
      />
    );
  };
  const renderInstruction = ({ item }) => {
    let textMap = [];
    console.info(item);
    item.split("</b>").forEach((line) => {
      let parts = line.split("<b>");
      if (parts[0].includes("</div>")) {
        let partText = parts[0].split('">')[1].replace("</div>", "");
        if (!parts[0].includes("(")) {
          partText = " (" + partText + ")";
        }
        textMap.push({ text: partText, bold: false, italics: false });
      } else {
        textMap.push({ text: parts[0], bold: false, italics: false });
      }
      if (parts.length > 1 && parts[1] !== "") {
        textMap.push({ text: parts[1], bold: true, italics: false });
      }
    });
    return (
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {textMap.map((part, index) => {
          return (
            <Text
              style={{
                marginVertical: 10,
                fontStyle: part.italics ? "italic" : "normal",
              }}
              fontWeight={part.bold ? "bold" : "normal"}
              key={index}
            >
              {part.text}
            </Text>
          );
        })}
      </View>
    );
  };

  const errorOut = (errorMessage) => {
    navigation.goBack();
    Alert.alert("Use Another App", errorMessage);
  };
  process.env.MAPS_API_KEY === undefined ? errorOut("Missing API Key") : null;
  return (
    <Layout>
      <TopNav
        leftContent={
          <Ionicons
            name="chevron-back"
            color={isDarkmode ? "white" : "black"}
            size={20}
          />
        }
        leftAction={navigation.goBack}
        middleContent={trip.name}
      />
      <Section>
        <Modal visible={instructionModalVisible} animationType="slide">
          <Section style={styles.editTripNameContainer}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ flex: 1, height: "70%", width: "92%" }}>
                <FlatList
                  data={inst}
                  renderItem={renderInstruction}
                  numColumns={1}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <SectionContent style={styles.buttonSection}>
                <Button
                  text="Close"
                  onPress={() => setInstructionModalVisible(false)}
                  style={styles.button}
                />
              </SectionContent>
            </SafeAreaView>
          </Section>
        </Modal>
        <SectionContent>
          <View>
            <Text>From: {trip.srcName}</Text>
            <Text>To: {trip.destName}</Text>
          </View>
          {executionInfo.length > 0 ? (
            <View>
              <Text>
                {Math.round(executionInfo[0])}mins (
                {executionInfo[1].toFixed(2)}km)
              </Text>
              <Text>
                {executionInfo[2] == 0
                  ? "Free"
                  : executionInfo[2] == -1
                  ? "Unable to Estimate"
                  : `S$${executionInfo[2]}`}
              </Text>
            </View>
          ) : null}
        </SectionContent>
        <MapView
          initialRegion={getIntitialRegion(origin, destination)}
          style={{ height: "50%" }}
          customMapStyle={isDarkmode ? darkMapStyle : []}
          userInterfaceStyle={isDarkmode ? "dark" : "light"}
        >
          <Marker
            coordinate={origin}
            pinColor={themeColor.primary}
            description={transport.type === "TRANSIT" ? inst[0] : null}
            title={transport.type === "TRANSIT" ? "Step 1" : null}
          />
          <Marker coordinate={destination} />
          {markers.map((item, index) => {
            console.log(index);
            return (
              <Marker
                coordinate={{ latitude: item.lat, longitude: item.lng }}
                pinColor={themeColor.warning500}
                description={inst[index + 1]}
                title={`Step ${index + 2}`}
                key={index}
              />
            );
          })}
          <MapViewDirections
            origin={origin}
            destination={destination}
            mode={transport.type}
            apikey={process.env.MAPS_API_KEY}
            strokeWidth={5}
            resetOnChange={true}
            strokeColor={"#6495ED"}
            onReady={(result) => {
              transport.getPrice(result).then((executionPrice) => {
                setExecutionInfo([
                  result.duration,
                  result.distance,
                  executionPrice,
                ]);
              });
              let instructions = [];
              result.legs[0].steps.forEach((x) =>
                x.html_instructions
                  .replace(/<wbr\/>/g, "")
                  .split("<br>")
                  .forEach((x) => {
                    if (x !== "") {
                      instructions.push(x);
                    }
                  })
              );
              let routeSteps = result.legs[0].steps;
              let markerCoords = [];
              for (var i = 1; i < routeSteps.length; i++) {
                if (
                  routeSteps[i].travel_mode != routeSteps[i - 1].travel_mode ||
                  routeSteps[i].travel_mode == "TRANSIT"
                ) {
                  markerCoords.push(routeSteps[i].start_location);
                }
              }
              setMarkers(markerCoords);
              setInst(instructions);
              setGmap(result);
            }}
            onError={(errorMessage) => {
              errorOut(errorMessage);
            }}
          />
        </MapView>
        <SectionContent
          style={{ flexDirection: "column", justifyContent: "center" }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              text={<FontAwesome5 name={"play"} size={16} />}
              status="success"
              style={styles.button}
              onPress={() => {
                executeTrip(
                  trip,
                  new Date(),
                  transport.name,
                  executionInfo[2],
                  executionInfo[0],
                  executionInfo[1]
                );
                Alert.alert(
                  `Executed Successfully`,
                  `${trip.name} has been executed!`
                );
                eventBus.notify("updateExecutedTrips", null);
                navigation.goBack();
              }}
            />
            <Button
              text={<FontAwesome5 name={"info-circle"} size={16} />}
              status="info"
              style={styles.button}
              onPress={() => {
                setInstructionModalVisible(true);
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FlatList
              data={getAllTransports()}
              renderItem={renderTransport}
              numColumns={getAllTransports().length}
            />
          </View>
        </SectionContent>
      </Section>
    </Layout>
  );
}

export const getIntitialRegion = (origin, destination) => {
  let minLat = Math.min(origin.latitude, destination.latitude);
  let maxLat = Math.max(origin.latitude, destination.latitude);
  let minLng = Math.min(origin.longitude, destination.longitude);
  let maxLng = Math.max(origin.longitude, destination.longitude);
  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;
  const deltaLat = maxLat - minLat;
  const deltaLng = maxLng - minLng;
  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: deltaLat * 1.2,
    longitudeDelta: deltaLng * 1.2,
  };
};

/**
 * The styles for the `SavedTripInfo` component.
 */

const styles = StyleSheet.create({
  buttonSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 4,
  },
  editTripNameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
  },
  textContainer: {
    flexWrap: "wrap",
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    marginLeft: 20,
    marginTop: 55,
  },
});

export default SavedTripInfo;
