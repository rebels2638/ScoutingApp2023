import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image
} from "react-native";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import ScoutingColors from "../../Config/ScoutingColors";

export default function ClimbHeight(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const selectedIndex = useSelector(selectID(props.id));

	const data = [
		["Low", require("../../Assets/EndLow.png")],
		["Leveled", require("../../Assets/EndLevel.png")],
		["High", require("../../Assets/EndHigh.png")]
	];

	return (
		<View style={{ alignItems: "center" }}>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>Initial Climb Height</Text>

			<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
				{data.map((row, index) =>
					<View key={row[0]} style={[styles.container, { backgroundColor: (selectedIndex === index ? props.bgc : ScoutingColors.white) }]}>
						<Pressable onPress={() => {dispatch(setKeyPair([props.id, index]))}}>
							<Image source={row[1]} style={styles.image} />
							<Text style={{ textAlign: "center" }}>{row[0]}</Text>
						</Pressable>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		justifyContent: "center",
		margin: 10
	},
	image: {
		borderRadius: 10,
		height: 150,
		width: 280
	}
});