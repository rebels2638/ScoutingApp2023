import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet
} from "react-native";

import { setKeyPair, setDefault, selectID, selectBlendedID, consumeBlend } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import ScoutingColors from "../../Config/ScoutingColors";

export default function CustomTextBox(props) {
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	
	// set default value
	dispatch(setDefault([props.id, ""]));

	// get value from store
	const reduxText = useSelector(selectID(props.id));
	
	// state issues with loading/resets.    context:
	// https://github.com/PatheticMustan/ScoutingApp2019/issues/36#issuecomment-667728272
	// https://github.com/rebels2638/ScoutingApp2022/issues/18
	const blendedText = useSelector(selectBlendedID(props.id));

	if (blendedText !== null) {
		setText(blendedText);
		dispatch(consumeBlend(props.id))
	}

	// keep redux text updated after a 500ms delay of not editing
	useEffect(() => {
		const interval = setInterval(() => {
			if (reduxText !== text) dispatch(setKeyPair([props.id, text]));
		}, 500);

		// basically componentWillUnmount but this time it's for React hooks
		return () => clearInterval(interval);
	}, [text]);

	return (
		<View style={{
			width: props.width,
			height: props.height || 40
		}}>
			<TextInput
				keyboardType={props.keyboardType}
				multiline={props.multi}
				numberOfLines={props.multi ? props.lines : 1}
				editable
				placeholder={props.placeholder || ""}
				style={{
					flex: 1,
					padding: 10,
					backgroundColor: (props.backgroundColor ? props.backgroundColor : ScoutingColors.white),
					borderColor: ScoutingColors.doveGray,
					borderWidth: StyleSheet.hairlineWidth,
					borderRadius: (props.borderRadius ? props.borderRadius : props.height / 5)
				}}
				{...props.options}
				value={text}
				onChangeText={text => setText(text)}
			/>
		</View>
	);
}