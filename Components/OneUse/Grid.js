import {
	StyleSheet,
	View,
	Text as RNText,
	Pressable,
	ImageBackground
} from "react-native";
import { Text } from "../../Components/Themed/Text";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";

export default function Grid(props) {
	const dispatch = useDispatch();
	const { colors } = useTheme();

	return (
		<View style={{ alignItems: "center" }}>
			<Text>PLACEHOLDER GRID!!!!!! :3</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		width: 100,
		height: 40,
	}
});



// <Grid>children</Grid>