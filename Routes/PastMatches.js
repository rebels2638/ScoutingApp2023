import React from "react";
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

	const find = (pmm, id) => pmm[1][id];

	// matches = storage
	// parse matches
	// if new match add to state

	return (
		<FlatList
			data={matches}
			renderItem={(data) => {
				return (
					<Pressable onPress={() => {
						props.navigation.navigate("Scout");

						// the VERY VERY lazy solution
						dispatch(loadMatch(data.item[1]));
					}}>
						<View style={styles.item}>
							<Text style={styles.text}>
								{["Qualification", "Quarterfinal", "Semifinal"][find(data.item, "MatchType")]} #{find(data.item, "MatchNumber")} (Team {find(data.item, "TeamNumber")})
							</Text>
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
		padding: 20
	},
	text: {
		fontSize: 20,
	}
});
