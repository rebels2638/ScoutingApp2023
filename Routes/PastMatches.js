import {
	StyleSheet,
	View,
	Text as RNText,
	FlatList,
	Pressable,
	Platform,
	Dimensions,
	Alert
} from "react-native";
import { Text } from "../Components/Themed/Text";

import Header from "./PastMatchesComponents/Header.js";

import { useDispatch, useSelector } from "react-redux";
import { deleteSingleMatch, selectMatches, selectSelectedMatches, toggleSelectMatch } from "../Redux/Features/matchSlice.js";
import { loadMatch } from "../Redux/Features/dataSlice.js";

import { Constants } from "react-native-unimodules";
import Link from "../Components/Utility/Link.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

export default function PastMatches(props) {
	const dispatch = useDispatch();
	const { colors } = useTheme();

	// get value from store
	const matches = useSelector(selectMatches);
	const selectedMatches = useSelector(selectSelectedMatches);

	// matches = storage
	// parse matches
	// if new match add to state

	const resetIndividualMatch = async (matchKey) => {
		if (Platform.OS === "web") {
			if (confirm("Are you sure you want to remove this match?")) {
				const matches = JSON.parse(await AsyncStorage.getItem("matches")) || [];
				const mki = matches.findIndex(v => v && (v[0] === matchKey));
				matches.splice(mki, 1);
				AsyncStorage.setItem("matches", JSON.stringify(matches));

				dispatch(deleteSingleMatch(matchKey));
			}
		} else {
			Alert.alert(
				"Reset", "Are you sure you want to remove this match?",
				[
					{ text: "Reset", onPress: async () => {
						const matches = JSON.parse(await AsyncStorage.getItem("matches")) || [];
						const mki = matches.findIndex(v => v && (v[0] === matchKey));
						matches.splice(mki, 1);
						AsyncStorage.setItem("matches", JSON.stringify(matches));

						dispatch(deleteSingleMatch(matchKey));
					}},
					{ text: "Cancel", style: "cancel" }
				]
			);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={{ height: Dimensions.get('window').height*0.123 }}>
				<Header />
			</View>

			<View style={{ flex: 1 }}>
				<FlatList
					data={matches}
					renderItem={(data) => {
						const [matchKey, matchData] = data.item;
						// ultra scuffed method of adding spaces
						const s = " ";

						return (
							<Pressable onPress={() => {
								props.navigation.navigate("Scout");

								// the VERY VERY lazy solution
								dispatch(loadMatch(matchData));
							}}>
								<View style={[styles.item, {borderColor: colors.border}]}>
									<Pressable onPress={() => dispatch(toggleSelectMatch(matchKey))}>
										<View style={[
											styles.teamIndicator,
											{backgroundColor: (matchData["Team"]? colors.red : colors.blue),
											borderColor: colors.border}
										]}>
											<RNText style={{ fontSize: 35 }}>
												{selectedMatches[matchKey] === true? "X" : ""}
											</RNText>
										</View>
									</Pressable>

									<Text style={styles.text}>
										{["Practice", "Qualification", "Quarterfinal", "Semifinal"][matchData["MatchType"]]}{s}
										#{matchData["MatchNumber"]}{s}
										(Team {matchData["TeamNumber"]}){s}
									</Text>

									<View style={{ marginLeft: "auto", marginRight: 50 }}>
										<Link onPress={() => resetIndividualMatch(matchKey)} color="red">Delete</Link>
									</View>
								</View>
							</Pressable>
						);
					}}
					ListEmptyComponent={() => {
						return (
							<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
								<Text style={{ margin: 100, fontSize: 21 }}>There are no items!</Text>
							</View>
						);
					}}
					keyExtractor={data => {
						return data[0];
					}} /** https://stackoverflow.com/a/49577737/12894940 */
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		marginTop: Constants.statusBarHeight,
	},
	item: {
		borderWidth: 1,
		padding: 20,
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	teamIndicator: {
		width: 50,
		height: 50,
		borderRadius: 20,
		borderWidth: 1,
		margin: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontSize: 20,
	}
});
