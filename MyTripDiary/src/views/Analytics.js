// /**
//  * This is the Analytics tab screen component.
//  * It displays all the analytics contents on the Analytics tab screen.
//  * @param {object} navigation - The navigation object provided by React Navigation.
//  * @returns {JSX.Element} - The JSX element that represents the Analytics tab screen.
//  */
// import React from 'react';
// import { ScrollView, View, Dimensions } from 'react-native';
// import { Layout, Text } from 'react-native-rapi-ui';
// import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// const pieData = [
//   { name: 'Car', value: 40, color: 'rgba(66, 135, 245, 0.8)' },
//   { name: 'Bus', value: 30, color: 'rgba(245, 145, 66, 0.8)' },
//   { name: 'MRT', value: 20, color: 'rgba(66, 245, 147, 0.8)' },
// ];

// const lineData = {
//   labels: ['Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5'],
//   datasets: [
//     {
//       data: [50, 100, 80, 120, 75],
//       color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
//       strokeWidth: 2,
//     },
//   ],
// };

// const barData = {
//   labels: ['Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5'],
//   datasets: [
//     {
//       data: [50, 100, 80, 120, 75],
//       color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
//       strokeWidth: 2,
//     },
//   ],
// };

// export default function ({ navigation }) {
//   return (
//     <Layout>
//       <ScrollView>
//         <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Mode of Transport</Text>
//         <PieChart
//           data={pieData}
//           width={screenWidth}
//           height={200}
//           chartConfig={{
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             strokeWidth: 2,
//           }}
//           accessor={'value'}
//           paddingLeft={'15'}
//         />

//         <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Cost per Trip</Text>
//         <LineChart
//           data={lineData}
//           width={screenWidth}
//           height={200}
//           chartConfig={{
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             strokeWidth: 2,
//           }}
//         />

//         <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Time and Cost per Distance</Text>
//         <BarChart
//           data={barData}
//           width={screenWidth}
//           height={200}
//           chartConfig={{
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             strokeWidth: 2,
//           }}
//         />
//       </ScrollView>
//     </Layout>
//   );
// }
