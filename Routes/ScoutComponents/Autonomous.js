import React from "react";
import {
	StyleSheet,
	Text,
	View
} from "react-native";

import BoolButton from "../../Components/Buttons/BoolButton.js";
import NumButton from "../../Components/Buttons/NumButton.js";
import CustomTextBox from "../../Components/Utility/CustomTextBox.js";
import Arena from "../../Components/Utility/Arena.js";
import ScoutingColors from "../../Config/ScoutingColors";

import { useSelector, useDispatch } from "react-redux";
import { selectID, setDefault } from "../../Redux/Features/dataSlice.js";

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
				<Arena>
					<View style={{ flex: 4, justifyContent: "center" }}></View>
					<View style={{
						flex: 1,
						justifyContent: "space-between",
						flexDirection: selectedTeam == 1 ? "column-reverse" : "column"
					}}>
						<View style={{ flex: 1 }} />
						<View style={{ flex: 1, alignItems: "center" }}>
							<NumButton id="BallsPickedUp" width={160}>Balls Picked Up</NumButton>

							<NumButton id="AutoUpperHubScored" width={160}>Upper Hub Scored</NumButton>
							<NumButton id="AutoUpperHubMissed" width={160}>Upper Hub Missed</NumButton>
							<NumButton id="AutoLowerHubScored" width={160}>Lower Hub Scored</NumButton>
							<NumButton id="AutoLowerHubMissed" width={160}>Lower Hub Missed</NumButton>
						</View>
						<View style={{ flex: 0.6 }} />
					</View>

					<View style={{
						flex: 1,
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: selectedTeam == 1 ? "column-reverse" : "column"
					}}>
						<View style={{ flex: 0.25, justifyContent: "space-between", alignSelf: "center" }}>
							<BoolButton id="CrossesInitiationLine" bgc="lime" width={160}>Crosses Initation Line</BoolButton>
						</View>
						<View style={{ flex: 0.25 }} />
					</View>

					<View style={{
						flex: 1,
						justifyContent: "center",
						flexDirection: selectedTeam == 1 ? "column-reverse" : "column"
					}}>
						<BoolButton id="ExitTarmac" bgc="lime" width={160}>Leaves the Tarmac</BoolButton>
					</View>
				</Arena>

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