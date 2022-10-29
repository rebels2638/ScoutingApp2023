import {
	StyleSheet,
	View
} from "react-native";
import { Text } from "../../Components/Themed/Text";

import BoolButton from "../../Components/Buttons/BoolButton";
import NumButton from "../../Components/Buttons/NumButton";
import { useTheme } from "@react-navigation/native";

export default function Other() {
	const { colors } = useTheme();

	return (
		<View style={[styles.container, {backgroundColor: colors.background}]}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Other</Text>
			<View style={[styles.otherContainer, {backgroundColor: colors.card, borderColor: colors.border}]}>
				<NumButton id="FoulCount" width={160}>Fouls</NumButton>
				<BoolButton id="YellowCard" bgc="yellow" width={160}>Yellow Card</BoolButton>
				<BoolButton id="RedCard" bgc="red" width={160}>Red Card</BoolButton>
				<BoolButton id="Breakdown" bgc="orange" width={160}>Breakdown</BoolButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 50,
		paddingVertical: 20
	},
	otherContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		paddingVertical: 20,
		paddingBottom: 20
	}
});
