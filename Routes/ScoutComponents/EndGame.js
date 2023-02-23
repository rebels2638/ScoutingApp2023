import {
	StyleSheet,
	View
} from "react-native";
import { Text } from "../../Components/Themed/Text";

import CustomTextBox from "../../Components/Utility/CustomTextBox";
import Timer from "../../Components/OneUse/Timer.js";
import ClimbPosition from "../../Components/OneUse/ClimbPosition.js";
import ScoutingColors from "../../Config/ScoutingColors";
import { useDispatch } from "react-redux";
import { setDefault } from "../../Redux/Features/dataSlice.js";
import BoolButton from "../../Components/Buttons/BoolButton.js";
import NumButton from "../../Components/Buttons/NumButton.js";
import RadioButton from "../../Components/Buttons/RadioButton.js";
import { useTheme } from "@react-navigation/native";

export default function Endgame() {
	const dispatch = useDispatch();
	const { colors } = useTheme();
	const endgameID = "EndgameType";

	// set default value
	dispatch(setDefault([endgameID, 0]));

	return (
		<View>
			<NumButton id="NumRoboClimbed" width={160}>Number of Robots climbed</NumButton>
			<NumButton id="TimeToEngaged" width={160}>Endgame Time to Engaged</NumButton>
			<RadioButton id="EndgameClimb" data={["None", "Docked", "Engaged", "Failed"]} bgc="orange" segmentedButton options={{flexDirection: "row"}}/>
			<CustomTextBox
				multi={true}
				id="EndgameComments"
				width={900}
				height={250}
				placeholder="Type your comments here..."
				borderRadius={10}
			/>
		</View>
	);
	
}


const styles = StyleSheet.create({
	climbComments: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin: 30
	},
	climbPosition: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center"
	},
	container: {
		paddingHorizontal: 50,
		paddingVertical: 20
	},
	endgameContainer: {
		alignItems: "center",
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		padding: 20
	}
});