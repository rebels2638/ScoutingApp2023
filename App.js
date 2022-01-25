/* eslint-disable react/display-name */
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, Octicons, Ionicons } from "react-native-vector-icons";

import store from "./Redux/Store.js";
import { Provider, useDispatch } from "react-redux";
import { importMatches } from "./Redux/Features/matchSlice.js";

import Scout from "./Routes/Scout.js";
import PastMatches from "./Routes/PastMatches.js";
import About from "./Routes/About.js";
import ScoutingColors from "./Config/ScoutingColors";

// create bottom tab navigation
const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Scout"
			tabBarOptions={{
				activeTintColor: ScoutingColors.ruby,
			}}
		>
			<Tab.Screen
				name="Scout"
				component={Scout}
				options={{
					tabBarLabel: "Scout",
					tabBarIcon: ({ color, size }) => <Octicons name="checklist" color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="PastMatches"
				component={PastMatches}
				options={{
					tabBarLabel: "Past Matches",
					tabBarIcon: ({ color, size }) => <Entypo name="back-in-time" color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="About"
				component={About}
				options={{
					tabBarLabel: "About",
					tabBarIcon: ({ color, size }) => <Ionicons name="ios-information-circle" color={color} size={size} />
				}}
			/>
		</Tab.Navigator>
	);
}

// Async Storage Setter ;)
// The ASS handles stuff like setting matches to [] if empty, and syncing AsyncStorage and state.matches
function ASS() {
	const dispatch = useDispatch();

	(async () => {
		const matches = await AsyncStorage.getItem("matches");

		if (matches == null) {
			//  If not found, set empty match data in AsyncStorage.
			await AsyncStorage.setItem("matches", "[]");
		} else {
			// otherwise sync state.matches.matches and AsyncStorage
			// remove any null entries
			const parsedMatches = JSON.parse(matches);
			const filteredMatches = parsedMatches.filter(v => v instanceof Array);

			// dispatch filteredMatches to redux matches
			dispatch(importMatches(filteredMatches));

			// save filteredMatches to AsyncStorage
			if (parsedMatches !== filteredMatches) {
				await AsyncStorage.setItem("matches", JSON.stringify(filteredMatches));
			}
		}
	})();

	// mmmm, look at that empty component return, it just gives me chills O_o
	return <></>;
}

export default function App() {
	// make store global bc I want to see the data pls
	window.natsumi = store;

	// shut up console.warn
	// console.warn = () => {}

	return (
		<Provider store={store}>
			{/** ASS must be inside the Provider to dispatch importMatches(), so I made it into a component. */}
			<ASS />

			<NavigationContainer>
				<MyTabs />
			</NavigationContainer>

			<StatusBar style="dark" />
		</Provider>
	);
}