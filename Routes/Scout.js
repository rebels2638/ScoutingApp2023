import React from "react";
import {
	View,
	ScrollView
} from "react-native";

import Header from "./ScoutComponents/Header.js";
import MatchInfoContainer from "./ScoutComponents/MatchInfoContainer.js";
import Autonomous from "./ScoutComponents/Autonomous.js";
import TeleOp from "./ScoutComponents/TeleOp.js";
import Endgame from "./ScoutComponents/EndGame.js";
import Other from "./ScoutComponents/Other.js";

/** Test Components */

export default function Scout() {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Header />
			</View>

			<View style={{ flex: 7 }}>
				<ScrollView>
					<MatchInfoContainer />
					<Autonomous />
					<TeleOp />
					<Endgame />
					<Other />
				</ScrollView>
			</View>
		</View>
	);
}