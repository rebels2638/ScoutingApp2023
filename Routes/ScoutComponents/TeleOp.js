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

import { useDispatch, useSelector } from "react-redux";
import { setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function TeleOp() {
	const dispatch = useDispatch();
	const arenaID = "Team";

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const selectedTeam = useSelector(selectID(arenaID));

	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>Tele-Op</Text>
			<View style={styles.teleOpContainer}>

				<Arena>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: selectedTeam == 1 ? "column-reverse" : "column" }}>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<BoolButton id="PlaysDefense" bgc="lime" >Plays Defense</BoolButton>
						</View>
						<View style={{ flex: 1, justifyContent: "center" }}>
							<NumButton id="BallsPickedUpFromLoadingStation" height={80}>Balls Picked Up from Loading Station</NumButton>
						</View>
					</View>

					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: selectedTeam == 1 ? "column-reverse" : "column" }}>
						<View style={{ flex: 9 }} />
						<BoolButton id="Rotation" bgc="lime">Rotation</BoolButton>
						<BoolButton id="Color" bgc="lime">Color</BoolButton>
					</View>

					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: selectedTeam == 1 ? "column-reverse" : "column" }}>
						<View style={{ flex: 3 }}>
						</View>
						<View style={{ flex: 1 }}>
							<NumButton id="BallsPickedUpFromFloor" height={80}>Balls Picked Up from Floor</NumButton>
						</View>
						<View style={{ flex: 1.5, justifyContent: "center" }}>
							<BoolButton id="FitsUnderTrench" bgc="lime">Fits Under Trench</BoolButton>
						</View>
					</View>

					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: selectedTeam == 1 ? "column-reverse" : "column" }}>
						<View style={{ flex: 0.4 }} />
						<View style={{ flex: 2.4 }}>
							<Text
								style={{ fontSize: 12, color: "white", width: 120, textAlign: "center" }}
								margin={0}
							>
								Where can they shoot from?
							</Text>

							<BoolButton id="TargetZone" bgc="lime">Target Zone</BoolButton>
							<BoolButton id="TrenchZone" bgc="lime">Trench Zone</BoolButton>
							<BoolButton id="Other" bgc="lime">Other</BoolButton>
						</View>
						<View style={{ flex: 4 }}></View>
					</View>

					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: selectedTeam == 1 ? "column-reverse" : "column" }}>
						<View style={{ flex: 2 }}></View>

						<View style={{ flex: 2 }}>
							<Text
								style={{ fontSize: 12, color: "white", width: 120, textAlign: "center" }}
								margin={0}
							>
								Balls Scored
							</Text>

							<NumButton id="TeleLow">Low</NumButton>
							<NumButton id="TeleOuter">Outer</NumButton>
							<NumButton id="TeleInner">Inner</NumButton>
							<NumButton id="TeleMissed">Missed</NumButton>
						</View>
					</View>

				</Arena>

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
						backgroundColor={ScoutingColors.lightGray}
						borderRadius={10}
					/>
				</View>
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
	teleOpContainer: {
		alignItems: "center",
		borderColor: ScoutingColors.black,
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth
	}
});
