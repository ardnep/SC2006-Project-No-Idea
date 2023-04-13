/**
 * This is the Analytics tab screen component.
 * It displays all the analytics contents on the Analytics tab screen.
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} - The JSX element that represents the Analytics tab screen.
 */
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  Modal,
  Dimensions,
} from "react-native";
import { Layout } from "react-native-rapi-ui";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
} from "victory-native";
import { DataTable } from "react-native-paper";
import { Line, Path, G, Text as SVGText } from "react-native-svg";
import { LineChart, BarChart } from "react-native-chart-kit";
import { getAllExecutedTrips } from "../controllers/SavedTripsController";

// Mocked data
const trips = getAllExecutedTrips();

const optimizedTrips = trips.map((trip) => ({
  ...trip,
  duration: trip.duration * 0.8,
  tripPrice: trip.tripPrice * 0.7,
}));

const totalTripPrice = trips.reduce((total, trip) => total + trip.tripPrice, 0);
const totalDuration = trips.reduce((total, trip) => total + trip.duration, 0);

const optimizedTotalTripPrice = optimizedTrips.reduce(
  (total, trip) => total + trip.tripPrice,
  0
);
const optimizedTotalDuration = optimizedTrips.reduce(
  (total, trip) => total + trip.duration,
  0
);

const CustomLineChart = ({ data, width, height }) => {
  const chartData = {
    labels: data.map((_, index) => `Trip ${index + 1}`),
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

const transportModes = ["Car", "Taxi", "Transit", "Cycling", "Walking"];
const transportColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#000000"];

export default function ({ navigation }) {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const transportTripPrice = transportModes.map((modeOfTransport) =>
    trips
      .filter((trip) => trip.modeOfTransport === modeOfTransport)
      .reduce((total, trip) => total + trip.tripPrice, 0)
  );

  const CombinedBarChart = ({ data, width, height }) => {
    const chartData = {
      labels: data.map((_, index) => `Trip ${index + 1}`),
      datasets: [
        {
          data: data.map((d) => d.y1),
          color: (opacity = 1) => `rgba(0, 136, 254, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: data.map((d) => d.y2),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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

  const TotalBarChart = ({ data, labels, width, height }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          colors: [
            (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
            (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
            (opacity = 1) => `rgba(255, 206, 86, ${opacity})`,
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
    const modeOfTransport = trip.modeOfTransport;
    if (!frequency[modeOfTransport]) {
      frequency[modeOfTransport] = 0;
    }
    frequency[modeOfTransport]++;
    return frequency;
  }, {});

  const pieData = Object.entries(transportFrequency).map(([modeOfTransport, value]) => {
    return { modeOfTransport, value };
  });

  const pieData2 = transportTripPrice.map((tripPrice, index) => ({
    value: tripPrice,
    modeOfTransport: transportModes[index],
    color: transportColors[index],
  }));

  const tripRows = trips
    .filter((trip) => !selectedTransport || trip.mode === selectedTransport)
    .map((trip, index) => (
      <DataTable.Row key={index}>
        <DataTable.Cell>{trip.id}</DataTable.Cell>
        <DataTable.Cell>{trip.distance} km</DataTable.Cell>
        <DataTable.Cell>{trip.duration} min</DataTable.Cell>
        <DataTable.Cell>${Number(trip.tripPrice).toFixed(2)}</DataTable.Cell>
      </DataTable.Row>
    ));

  return (
    <Layout>
      <ScrollView>
        <View
          style={{ alignItems: "flex-end", marginRight: 10, marginTop: 15 }}
        >
          <Button
            title="Optimize"
            color="green"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
                backgroundColor: "white",
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
                  {"\n"}- Reduced overall trip price
                  {"\n"}- Reduced total trip duration
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
                    Before Optimization
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    After Optimization
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
                    Total Trip Price (Optimized vs. Not Optimized)
                  </Text>
                  <ComparisonBarChart
                    data={[totalTripPrice, optimizedTotalTripPrice]}
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
                    Total Trip Duration (Optimized vs. Not Optimized)
                  </Text>
                  <ComparisonBarChart
                    data={[totalDuration, optimizedTotalDuration]}
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
          padAngle={2}
          style={{ labels: { fontSize: 12, fontWeight: "bold" } }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        setSelectedTransport(props.datum.modeOfTransport);
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
                <DataTable.Title>Duration</DataTable.Title>
                <DataTable.Title>Trip Price</DataTable.Title>
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
          Price per Trip
        </Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryBar
            data={trips}
            x="id"
            y="Price"
            style={{
              data: {
                fill: ({ datum }) =>
                  transportColors[transportModes.indexOf(datum.modeOfTransport)],
              },
            }}
            barWidth={20}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `$${x}`}
            style={{ tickLabels: { fontSize: 10, padding: 5 } }}
          />
          <VictoryAxis
            tickFormat={(x) => `Trip ${Math.round(x)}`}
            style={{ tickLabels: { fontSize: 10, padding: 5 } }}
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
          Duration Taken per Trip{"\n"}
        </Text>
        <CustomLineChart
          data={trips.map((trip) => ({ x: trip.id, y: trip.duration }))}
          width={Dimensions.get("window").width}
          height={220}
        />
      </ScrollView>
    </Layout>
  );
}
