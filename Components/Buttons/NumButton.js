import {
	StyleSheet,
	Text,
	View,
	Pressable
} from "react-native";

import ScoutingColors from "../../Config/ScoutingColors";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function NumButton(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const value = useSelector(selectID(props.id));

	return (
		<Pressable
			onPress={() => {
				dispatch(setKeyPair([props.id, value + 1]));
			}}
			onLongPress={() => {
				dispatch(setKeyPair([props.id, Math.max((value - 1), 0)]));
			}}
		>
			<View style={{
				justifyContent: "center",
				borderRadius: 10,
				borderWidth: StyleSheet.hairlineWidth,
				width: (props.width ? props.width : 100),
				height: (props.height ? props.height : 40),
				backgroundColor: ScoutingColors.white,
				justifyContent: "center",
			}}>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text style={{ textAlign: "center" }}>{props.children} {`(${value})`}</Text>
				</View>
			</View>
		</Pressable>
	);
}