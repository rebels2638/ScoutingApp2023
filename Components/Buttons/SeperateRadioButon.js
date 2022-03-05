import {
	StyleSheet,
	Text,
	View,
	Pressable
} from "react-native";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function SeperateRadioButton(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const value = useSelector(selectID(props.id));
    const index = props.index || 0;
    const color = props.bgc || "orange";

	return (
		<Pressable onPress={() => {
			// if the press event exists, run it
			props.press && props.press();
			dispatch(setKeyPair([props.id, index]));
		}}>
			<View style={[
				styles.boolButtonContainer,
				{
					width: (props.width || 100),
					backgroundColor: (value === index ? color : ScoutingColors.white)
				}
			]}>
				<Text style={styles.textCenter}>{props.children}</Text>
			</View>
		</Pressable>
	);
}

const styles = new StyleSheet.create({
	boolButtonContainer: {
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		margin: 10,
		height: 40,
	},
	textCenter: { textAlign: "center" }
});