import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet
} from "react-native";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import ScoutingColors from "../../Config/ScoutingColors";

export default function CustomTextBox(props) {
	const dispatch = useDispatch();

	const [text, setText] = useState("");
	// Fixes issue #36
	// https://github.com/PatheticMustan/ScoutingApp2019/issues/36#issuecomment-667728272
	const [watchdog, bark] = useState("");

	// set default value
	dispatch(setDefault([props.id, ""]));

	// get value from store
	const reduxText = useSelector(selectID(props.id));

	useEffect(() => {
		const interval = setInterval(() => {
			/** #36 and solution:
			 * CONTEXT:
			 * every second, we want to check if the user typed.
			 * if they DID type, text should be different. We can check with (text !== reduxText)
			 * 
			 * PROBLEM:
			 * now the problem is we can't update text with reduxText, since it thinks the user typed.
			 * 
			 * SOLUTION:
			 * A way to fix this is to have a different state (watchdog) tracking specifically if reduxText changed.
			 * reduxText only updates when the textbox updates it, or during loadMatch!
			 * watchdog only updates when the textbox updates it.
			 * So we can kinda subtract the two. Now, we can check if loadMatch happened!
			 * We can check this with (watchdog !== reduxText)
			 **/
			if (watchdog !== reduxText) {
				setText(reduxText);
			} else {
				if (reduxText !== text) {
					bark(text);
					dispatch(setKeyPair([props.id, text]));
				}
			}
		}, 500);

		// basically componentWillUnmount but this time it's for React hooks
		return () => clearInterval(interval);
	}, [reduxText, text]);

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
				value={text}
				style={{
					flex: 1,
					padding: 10,
					backgroundColor: (props.backgroundColor ? props.backgroundColor : ScoutingColors.white),
					borderColor: ScoutingColors.doveGray,
					borderWidth: StyleSheet.hairlineWidth,
					borderRadius: (props.borderRadius ? props.borderRadius : props.height / 5)
				}}
				{...props.options}
				onChangeText={text => setText(text)}
			/>
		</View>
	);
}