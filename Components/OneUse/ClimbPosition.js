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
	// [name, flexSpace]
	const data = [
		["Traversal", 1],
		["High", 1],
		["Medium", 1],
		["Low", 1],
		["None", 1]
	];

	return (
		<View style={{ alignItems: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 20 }}>Climb Position</Text>

			<ImageBackground source={require("../../Assets/ClimbPosition.png")} style={{ width: 800, height: 400 }}>
				<View style={styles.container}>
					{
						data.map((v, i) =>
							<View style={{ flex: data[i][1] }} key={data[i][0]}>
								<Pressable onPress={() => {dispatch(setKeyPair([props.id, i]))}}>
									<View style={{
										justifyContent: "center",
										borderRadius: 10,
										borderWidth: StyleSheet.hairlineWidth,
										margin: props.margin || 10,
										width: (props.width ? props.width : 100),
										height: 40,
										backgroundColor: (selectedIndex === i ? props.bgc : ScoutingColors.white)
									}}>
										<Text style={{ textAlign: "center" }}>{data[i][0]}</Text>
									</View>
								</Pressable>
							</View>
						)
					}
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		top: 330
	}
});