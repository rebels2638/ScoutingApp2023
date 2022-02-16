import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from "react-native";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesome } from "react-native-vector-icons";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function Incrementer(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const value = useSelector(selectID(props.id));

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => {
				// minimum value is 0
				if (value - 1 >= 0) {
					dispatch(setKeyPair([props.id, value - 1]));
				}
			}}>
				<View style={styles.iconContainer}>
					<FontAwesome name="minus" size={30} color={ScoutingColors.skyBlue} />
				</View>
			</TouchableOpacity>

			<Text style={{ fontSize: 30 }}>{props.max ? `${value}/${props.max}` : value+""}</Text>

			<TouchableOpacity onPress={() => {
				// first make sure max value exists, then do comparison
				if (!props.max || value + 1 <= props.max) {
					dispatch(setKeyPair([props.id, value + 1]));
				}
			}}>
				<View style={styles.iconContainer}>
					<FontAwesome name="plus" size={30} color={ScoutingColors.skyBlue} />
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: ScoutingColors.white,
		flex: 1,
		flexDirection: "row"
	},
	iconContainer: {
		padding: 5
	}
});
