import {
	StyleSheet,
	View
} from "react-native";
import { Text } from "../../Components/Themed/Text";

import BoolButton from "../../Components/Buttons/BoolButton.js";
import NumButton from "../../Components/Buttons/NumButton.js";
import CustomTextBox from "../../Components/Utility/CustomTextBox.js";
import GridArena from "../../Components/Utility/GridArena.js";

import { useDispatch } from "react-redux";
import { setDefault } from "../../Redux/Features/dataSlice.js";
import { useTheme } from "@react-navigation/native";

export default function TeleOp() {
	const dispatch = useDispatch();
	const { colors } = useTheme();
	const arenaID = "Team";

	// set default value
	dispatch(setDefault([arenaID, 0]));
	return (
		<View style={[styles.container, {backgroundColor: colors.background}]}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Tele-Op</Text>
			<View style={[styles.teleOpContainer, {borderColor: colors.border, backgroundColor: colors.card}]}>
				<GridArena items={[
					{ pos: [0.1, 0.8], com: _=>(<>
						<BoolButton id="FedGamePieces" bgc="lime" width={160} margin={0}> Fed Game Pieces</BoolButton>
					</>)},

					{ pos: [0.1, 0.155], com: _=>(<>
						<NumButton id="TeleOpMissed" width={160}>TeleOp Missed</NumButton>
					</>)},

					{ pos: [0.3, 0.3], com: _=>(<>
						<BoolButton id="WasDefended" bgc="lime" width={160}> Was Defended</BoolButton>
					</>)},

					{ pos: [0.3, 0.4], com: _=>(<>
						<BoolButton id="PlaysDefense" bgc="lime" width={160}> Plays Defense</BoolButton>
					</>)},
					
					

				]} />

				<Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Comments</Text>
				<Text style={{ textAlign: "center", fontSize: 14, marginLeft: 20, marginRight: 20, marginTop: 10 }}>
					Add any comments that you feel are useful. Does the robot get any penalties? Does the robot cycle
					efficiently? Do they struggle with picking up balls or shooting? Do they usually shoot high or low?
					Anything else that shows evidence of good/poor performance.
				</Text>
				<View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
					<CustomTextBox
						multi={true}
						id="TeleopComments"
						width={900}
						height={250}
						placeholder="Type your comments here..."
						borderRadius={10}
					/>
				</View>
			</View>
		</View>
	);

	return (
		<View>
			
			<BoolButton id="WasDefended" bgc="lime" width={160}> Was Defended</BoolButton>
			<BoolButton id="PlaysDefense" bgc="lime" width={160}> Plays Defense</BoolButton>
			<NumButton id="TeleOpMissed" width={160}>TeleOp Missed</NumButton>
			
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 50,
		paddingVertical: 20
	},
	teleOpContainer: {
		alignItems: "center",
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth
	}
});
