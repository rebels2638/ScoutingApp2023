import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ImageBackground
} from "react-native";
import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function ClimbPosition(props) {
	const dispatch = useDispatch();

	dispatch(setDefault([props.id, 0]));
	const selectedIndex = useSelector(selectID(props.id));

	// all possible options.
	// [name, [x, y]]
	const data = [
		["Traversal", [0.55, 0.1]],
		["High",      [0.47, 0.25]],
		["Medium",    [0.4, 0.42]],
		["Low",       [0.3, 0.63]],
		["None",      [0.1, 0.8]]
	];

	const width = 800;
	const height = 400;

	return (
		<View style={{ alignItems: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 20 }}>Climb Position</Text>

			<ImageBackground source={require("../../Assets/ClimbPosition2022.png")} style={{ width: width, height: height }}>
				{
					data.map((v, i) => {
						const [value, position] = v;
						const [x, y] = position;

						return (
							<Pressable onPress={() => {dispatch(setKeyPair([props.id, i]))}} key={v}>
								<View style={[
									styles.button,
									{ position: "absolute", left: width*x, top: height*y, key: value },
									{ backgroundColor: (selectedIndex === i ? props.bgc : ScoutingColors.white) }
								]}>
									<Text style={{ textAlign: "center" }}>{value}</Text>
								</View>
							</Pressable>
						);
					})
				}
			</ImageBackground>
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