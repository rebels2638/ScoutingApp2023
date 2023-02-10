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
	/*
	return (
		<View style={[styles.container, {backgroundColor: colors.background}]}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Autonomous</Text>
			<View style={[styles.autonomousContainer, {borderColor: colors.border, backgroundColor: colors.card}]}>
				<GridArena items={[
					{ pos: [0.69420, 0.2], com: _=>(<>
						<NumButton id="AutoUpperHubScored" width={160}>Upper Hub Scored</NumButton>
						<NumButton id="AutoLowerHubScored" width={160}>Lower Hub Scored</NumButton>
						<NumButton id="AutoUpperHubMissed" width={160}>Upper Hub Missed</NumButton>
						<NumButton id="AutoLowerHubMissed" width={160}>Lower Hub Missed</NumButton>
					</>)},

					{ pos: [0.1, 0.45], com: _=>(
						<BoolButton id="Taxi" bgc="lime" width={160}>Crosses Line/Taxi</BoolButton>
					)},

					{ pos: [0.25, 0.24], com: _=>(
						<BoolButton id="AutoBP1" bgc={color} width={70}>[1] Picks Up</BoolButton>
					)},

					{ pos: [0.26, 0.62], com: _=>(
						<BoolButton id="AutoBP2" bgc={color} width={70}>[2] Picks Up</BoolButton>
					)},

					{ pos: [0.37, 0.77], com: _=>(
						<BoolButton id="AutoBP3" bgc={color} width={70}>[3] Picks Up</BoolButton>
					)},

					{ pos: [0.06, 0.6], com: _=>(
						<BoolButton id="AutoBP4" bgc={color} width={70}>[4] Picks Up</BoolButton>
					)},

					{ pos: [0.14, 0.6], com: _=>(
						<BoolButton id="AutoBP5" bgc={color} width={70}>[5] Picks Up</BoolButton>
					)},

					{ pos: [0.4, 0.4], com: _=>(<WhiteText>Left Start</WhiteText>)},
					{ pos: [0.42, 0.59], com: _=>(<WhiteText>Middle Start</WhiteText>)},
					{ pos: [0.45, 0.66], com: _=>(<WhiteText>Right Start</WhiteText>)},
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
	*/

	return (
		<View>
			<BoolButton id="Taxi" bgc="lime" width={160}>Does Taxi</BoolButton>
			<Grid></Grid>
			<NumButton id="AutoMissed" width={160}>Auto Missed</NumButton>
			<RadioButton id="AutoClimb" data={["None", "Docked", "Engaged"]} bgc="orange" segmentedButton options={{flexDirection: "row"}}/>
			<Timer id="AutoTimeToEngaged">Time to Engaged</Timer>
			<CustomTextBox multi id="AutoComments" width={900} height={250} placeholder="Type your comments here..." borderRadius={10}/>
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