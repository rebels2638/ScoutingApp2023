import {
	StyleSheet,
	View,
	FlatList,
	Pressable,
	Text
} from "react-native";

import Header from "./PastMatchesComponents/Header.js";
import ScoutingColors from "../Config/ScoutingColors";

import { useDispatch, useSelector } from "react-redux";
import { selectMatches } from "../Redux/Features/matchSlice.js";
import { loadMatch } from "../Redux/Features/dataSlice.js";

import { Constants } from "react-native-unimodules";

export default function PastMatches(props) {
	const dispatch = useDispatch();

	// get value from store
	const matches = useSelector(selectMatches);

	// matches = storage
	// parse matches
	// if new match add to state

	return (
		<FlatList
			data={matches}
			renderItem={(data) => {
				const matchData = data.item[1];
				// ultra scuffed method of adding spaces
				const s = " ";

				return (
					<Pressable onPress={() => {
						props.navigation.navigate("Scout");

						// the VERY VERY lazy solution
						dispatch(loadMatch(matchData));
					}}>
						<View style={styles.item}>
							<Text style={styles.text}>
								{["Practice", "Qualification", "Quarterfinal", "Semifinal"][matchData["MatchType"]]}{s}
								#{matchData["MatchNumber"]}{s}
								(Team {matchData["TeamNumber"]}){s}
							</Text>

							<View style={[
								styles.teamIndicator,
								{backgroundColor: (matchData["Team"]? ScoutingColors.lightRed : ScoutingColors.lightBlue)}
							]}></View>
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
			ListHeaderComponent={<Header />}
			keyExtractor={data => {
				return data[0];
			}} /** https://stackoverflow.com/a/49577737/12894940 */
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		marginTop: Constants.statusBarHeight,
	},
	item: {
		borderColor: ScoutingColors.dimGray,
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
		borderColor: ScoutingColors.dimGray,
		borderWidth: 1,
		margin: 10
	},
	text: {
		fontSize: 20,
	}
});
