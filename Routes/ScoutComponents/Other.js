import React from "react";
import {
	StyleSheet,
	Text,
	View
} from "react-native";

import BoolButton from "../../Components/Buttons/BoolButton";
import NumButton from "../../Components/Buttons/NumButton";
import ScoutingColors from "../../Config/ScoutingColors";

export default function Other() {
	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Other</Text>
			<View style={styles.otherContainer}>
				<NumButton id="FoulCount" width={160}>Fouls</NumButton>
				<NumButton id="TechFoulCount" width={160}>Tech Fouls</NumButton>
				<BoolButton id="YellowCard" bgc="yellow" width={160}>Yellow Card</BoolButton>
				<BoolButton id="RedCard" bgc="red" width={160}>Red Card</BoolButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: ScoutingColors.white,
		paddingHorizontal: 50,
		paddingVertical: 20
	},
	otherContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		borderColor: ScoutingColors.black,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		paddingVertical: 20,
		paddingBottom: 20
	}
});
