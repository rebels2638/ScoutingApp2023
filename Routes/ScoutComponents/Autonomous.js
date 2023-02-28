import {
	StyleSheet,
	View,
	Text as RNText
} from "react-native";
import { Text } from "../../Components/Themed/Text";

import BoolButton from "../../Components/Buttons/BoolButton.js";
import NumButton from "../../Components/Buttons/NumButton.js";
import CustomTextBox from "../../Components/Utility/CustomTextBox.js";
import GridArena from "../../Components/Utility/GridArena.js";
import Grid from "../../Components/OneUse/Grid.js";

import { useSelector, useDispatch } from "react-redux";
import { selectID, setDefault } from "../../Redux/Features/dataSlice.js";
import RadioButton from "../../Components/Buttons/RadioButton.js";
import Spacer from "../../Components/Utility/Spacer.js";
import { useTheme } from "@react-navigation/native";
import Timer from "../../Components/OneUse/Timer";

function WhiteText(props) {
	return (<RNText style={{ color: "white" }}>{props.children}</RNText>);
}

export default function Autonomous() {
	const arenaID = "Team";
	const dispatch = useDispatch();

	// set default
	dispatch(setDefault([arenaID, 0]));
	// get value from store
	const selectedTeam = useSelector(selectID(arenaID));
	const color = selectedTeam? "red" : "blue";
	const { colors } = useTheme();
	
	/**
	 * 
	 * 
			<Grid></Grid>
			<NumButton id="AutoMissed" width={160}>Auto Missed</NumButton>
			<RadioButton id="AutoClimb" data={["None", "Docked", "Engaged"]} bgc="orange" segmentedButton options={{flexDirection: "row"}}/>
			<Timer id="AutoTimeToEngaged">Time to Engaged</Timer>
			<CustomTextBox multi id="AutoComments" width={900} height={250} placeholder="Type your comments here..." borderRadius={10}/>
	 */

	return (
		<View style={[styles.container, {backgroundColor: colors.background}]}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Autonomous</Text>
			<View style={[styles.autonomousContainer, {borderColor: colors.border, backgroundColor: colors.card}]}>
				<GridArena items={[
					{ pos: [0.3, 0.29], com: _=>(<>
						<BoolButton id="Taxi" bgc="lime" width={160}>Does Taxi</BoolButton>
					</>)},
				]} />

				<Spacer/>
				<Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>Starting Position</Text>
				<RadioButton
					id="StartingPosition"
					data={["Left Start", "Middle Start", "Right Start"]}
					bgc="orange"
					segmentedButton
					options={{
						flexDirection: "row",
					}}
				/>
				<Spacer/>

				<Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Comments</Text>
				<Text style={{ textAlign: "center", fontSize: 14, marginLeft: 20, marginRight: 20, marginTop: 10 }}>
					Add any comments that you feel are useful. Do they struggle with picking up balls or scoring?
					Does the robot cycle effectively? Anything else that shows evidence of good/poor performance.
				</Text>
				<View style={{ padding: 20 }}>
					<CustomTextBox
						multi={true}
						id="AutonomousComments"
						width={900}
						height={250}
						placeholder="Type your comments here..."
						borderRadius={10}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	autonomousContainer: {
		alignItems: "center",
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
	},
	container: {
		paddingHorizontal: 50,
		paddingVertical: 20
	},
	imageBackground: {
		flexDirection: "row",
		height: 500,
		marginTop: 20,
		width: 975
	}
});