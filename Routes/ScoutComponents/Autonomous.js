import {
	StyleSheet,
	Text,
	View
} from "react-native";

import BoolButton from "../../Components/Buttons/BoolButton.js";
import NumButton from "../../Components/Buttons/NumButton.js";
import CustomTextBox from "../../Components/Utility/CustomTextBox.js";
import GridArena from "../../Components/Utility/GridArena.js";
import ScoutingColors from "../../Config/ScoutingColors";

import { useSelector, useDispatch } from "react-redux";
import { selectID, setDefault } from "../../Redux/Features/dataSlice.js";
import SeperateRadioButton from "../../Components/Buttons/SeperateRadioButon.js";

function WhiteText(props) {
	return (<Text style={{ color: "white" }}>{props.children}</Text>);
}

export default function Autonomous() {
	const arenaID = "Team";
	const dispatch = useDispatch();

	// set default
	dispatch(setDefault([arenaID, 0]));
	// get value from store
	const selectedTeam = useSelector(selectID(arenaID));

	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Autonomous</Text>
			<View style={styles.autonomousContainer}>
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

					{ pos: [0.27, 0.25], com: _=>(
						<BoolButton id="AutoBP1" bgc="blue" width={50}>Picks Up</BoolButton>
					)},

					{ pos: [0.27, 0.62], com: _=>(
						<BoolButton id="AutoBP2" bgc="blue" width={50}>Picks Up</BoolButton>
					)},

					{ pos: [0.38, 0.77], com: _=>(
						<BoolButton id="AutoBP3" bgc="blue" width={50}>Picks Up</BoolButton>
					)},

					{ pos: [0.07, 0.6], com: _=>(
						<BoolButton id="AutoBP4" bgc="blue" width={50}>Picks Up</BoolButton>
					)},

					{ pos: [0.14, 0.6], com: _=>(
						<BoolButton id="AutoBP5" bgc="blue" width={50}>Picks Up</BoolButton>
					)},

					{ pos: [0.5, 0.5], com: _=>(
						<WhiteText>Left Start</WhiteText>
					)},
				]} />

				<SeperateRadioButton id="StartingPosition" index={0} width={160}>Starts Left</SeperateRadioButton>
				<SeperateRadioButton id="StartingPosition" index={1} width={160}>Starts Middle</SeperateRadioButton>
				<SeperateRadioButton id="StartingPosition" index={2} width={160}>Starts Right</SeperateRadioButton>

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
						backgroundColor={ScoutingColors.lightGray}
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
		borderColor: ScoutingColors.black,
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
	},
	container: {
		backgroundColor: ScoutingColors.white,
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