/**
 * @fileoverview This is the Analytics tab screen component. It displays all the analytics contents on the Analytics tab screen.
 * @module views/analytics/Analytics
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} - The JSX element that represents the Analytics tab screen.
 */
import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Modal,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Layout, themeColor, Text, useTheme } from "react-native-rapi-ui";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
} from "victory-native";
import { DataTable } from "react-native-paper";
import { LineChart, BarChart } from "react-native-chart-kit";
import { getAllExecutedTrips } from "../../controllers/SavedTripsController";
import eventBus from "../../models/EventBus";
import { getExecutedTripsSortedByDate } from "../../controllers/HistoryController";

const transportModes = ["Car", "Taxi", "Transit", "Cycling", "Walking"];
const transportColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D8A0A0"];

function formatData(data) {
  return data.map((trip, index) => {
    return {
      name: (index + 1).toString(),
      distance: trip.distance,
      time: trip.duration,
      cost:
        trip.tripPrice.userInputPrice == -1
          ? trip.tripPrice.estimatedPrice
          : trip.tripPrice.userInputPrice,
      mode: trip.modeOfTransport,
    };
  });
}

function getLast10Trips(executedTrips) {
  return executedTrips.slice(0, 10);
}

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const textColor = isDarkmode ? themeColor.white : themeColor.black;
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [trips, setTrips] = useState(formatData(getAllExecutedTrips()));
  const [tripsSortedByDate, setTripsSortedByDate] = useState(
    getLast10Trips(formatData(getExecutedTripsSortedByDate()))
  );
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTripsSortedByDate(
      getLast10Trips(formatData(getExecutedTripsSortedByDate()))
    );
    setTrips(formatData(getAllExecutedTrips()));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleEvent = () => {
      setTrips(formatData(getAllExecutedTrips()));
    };
    eventBus.subscribe("updateExecutedTrips", handleEvent);

    return () => {
      eventBus.unsubscribe("updateExecutedTrips", handleEvent);
    };
  }, []);
  const optimizedTrips = trips.map((trip) => ({
    ...trip,
    time: trip.time * 0.8,
    cost: trip.cost * 0.7,
  }));

  const totalCost = trips.reduce((total, trip) => total + trip.cost, 0);
  const totalTime = trips.reduce((total, trip) => total + trip.time, 0);

  const optimizedTotalCost = optimizedTrips.reduce(
    (total, trip) => total + trip.cost,
    0
  );
  const optimizedTotalTime = optimizedTrips.reduce(
    (total, trip) => total + trip.time,
    0
  );

  const CustomLineChart = ({ data, width, height }) => {
    const chartData = {
      labels: data.map((_, index) => `${index + 1}`),
      datasets: [
        {
          data: data.map((d) => d.y),
          color: (opacity = 1) => `rgba(0, 136, 254, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };

    const chartConfig = {
      backgroundGradientFrom: "#f9fafb",
      backgroundGradientTo: "#f9fafb",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2,
      propsForDots: {
        r: "4",
      },
      fillShadowGradient: "rgba(0, 136, 254, 0.3)",
      fillShadowGradientOpacity: 0.2,
    };

    return (
      <LineChart
        data={chartData}
        width={width}
        height={height}
        chartConfig={chartConfig}
      />
    );
  };

  const transportCost = transportModes.map((mode) =>
    trips
      .filter((trip) => trip.mode === mode)
      .reduce((total, trip) => total + trip.cost, 0)
  );

  const ComparisonBarChart = ({ data, labels, width, height }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          colors: [
            (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
            (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
          ],
          strokeWidth: 2,
        },
      ],
    };

    const chartConfig = {
      backgroundGradientFrom: "#FFF",
      backgroundGradientTo: "#FFF",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2,
      propsForDots: {
        r: "4",
      },
    };

    return (
      <BarChart
        data={chartData}
        width={width}
        height={height}
        yAxisLabel=""
        chartConfig={chartConfig}
        fromZero
      />
    );
  };

  const transportFrequency = trips.reduce((frequency, trip) => {
    const mode = trip.mode;
    if (!frequency[mode]) {
      frequency[mode] = 0;
    }
    frequency[mode]++;
    return frequency;
  }, {});

  const pieData = Object.entries(transportFrequency).map(([mode, value]) => {
    return { mode, value };
  });

  const pieData2 = transportCost.map((cost, index) => ({
    value: cost,
    mode: transportModes[index],
    color: transportColors[index],
  }));

  const tripRows = trips
    .filter((trip) => !selectedTransport || trip.mode === selectedTransport)
    .map((trip, index) => (
      <DataTable.Row key={index}>
        <DataTable.Cell textStyle={{ color: textColor }}>
          {trip.name}
        </DataTable.Cell>
        <DataTable.Cell textStyle={{ color: textColor }}>
          {trip.distance.toFixed(2)} km
        </DataTable.Cell>
        <DataTable.Cell textStyle={{ color: textColor }}>
          {trip.time.toFixed(1)} min
        </DataTable.Cell>
        <DataTable.Cell textStyle={{ color: textColor }}>
          ${trip.cost.toFixed(2)}
        </DataTable.Cell>
      </DataTable.Row>
    ));

  return (
    <Layout>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View
          style={{ alignItems: "flex-end", marginRight: 10, marginTop: 15 }}
        >
          <Button
            title="Optimize"
            color="green"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <Modal animationType="fade" visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                height: "80%",
                borderRadius: 10,
                padding: 20,
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  Trip Optimization
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 16,
                    fontWeight: "normal",
                    marginBottom: 20,
                  }}
                >
                  Optimization Details:
                  {"\n\n"}- Optimized route sequence
                  {"\n"}- Reduced overall trip cost
                  {"\n"}- Reduced total trip time
                  {"\n"}- Improved fuel efficiency
                  {"\n"}- Reduced CO2 emissions
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Before: Jurong Point to NTU (Taxi){"\n"}After: Jurong Point
                    to NTU (Transit)
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 20,
                      textAlign: "center",
                    }}
                  >
                    Total Trip Cost (Optimized vs. Not Optimized)
                  </Text>
                  <ComparisonBarChart
                    data={[totalCost, optimizedTotalCost]}
                    labels={["Not Optimized", "Optimized"]}
                    width={Dimensions.get("window").width - 60}
                    height={180}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 20,
                      textAlign: "center",
                    }}
                  >
                    Total Trip Time (Optimized vs. Not Optimized)
                  </Text>
                  <ComparisonBarChart
                    data={[totalTime, optimizedTotalTime]}
                    labels={["Not Optimized", "Optimized"]}
                    width={Dimensions.get("window").width - 60}
                    height={180}
                  />
                </View>

                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    alignSelf: "center",
                  }}
                >
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                    color="red"
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Mode of Transport
        </Text>
        <VictoryPie
          data={pieData}
          x="mode"
          y="value"
          colorScale={transportColors}
          innerRadius={30}
          labelRadius={({ innerRadius }) => innerRadius + 50}
          padAngle={2}
          style={{
            labels: { fontSize: 12, fontWeight: "bold", fill: textColor },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        setSelectedTransport(props.datum.mode);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />

        {selectedTransport && (
          <>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 20,
                textAlign: "center",
              }}
            >
              {`Selected Transport: ${selectedTransport}`}
            </Text>
            <DataTable style={{ marginTop: 10 }}>
              <DataTable.Header>
                <DataTable.Title>Trip ID</DataTable.Title>
                <DataTable.Title>Distance</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
                <DataTable.Title>Cost</DataTable.Title>
              </DataTable.Header>
              {tripRows}
            </DataTable>
          </>
        )}

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Cost per Trip
        </Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryBar
            data={tripsSortedByDate}
            x="name"
            y="cost"
            style={{
              data: {
                fill: ({ datum }) =>
                  transportColors[transportModes.indexOf(datum.mode)],
              },
            }}
            barWidth={20}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `$${x}`}
            style={{
              tickLabels: { fontSize: 10, padding: 5, fill: textColor },
            }}
          />
          <VictoryAxis
            tickFormat={(x) => `${x}`}
            style={{
              tickLabels: { fontSize: 10, padding: 5, fill: textColor },
            }}
          />
        </VictoryChart>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Time Taken per Trip{"\n"}
        </Text>
        <CustomLineChart
          data={tripsSortedByDate.map((trip) => ({
            x: trip.name,
            y: trip.time,
          }))}
          width={Dimensions.get("window").width}
          height={220}
        />
      </ScrollView>
    </Layout>
  );
}
