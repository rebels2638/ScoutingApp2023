// as the name suggests, kpvToCsv takes the important parts of the kpv, and converts it into a neat csv.

// matches: KPV[]
export default function kpvToCsv(matches) {
	// the holy grail contains all the data for converting the kpv's to one giant csv file
	const theHolyGrail = [{
		name: "Team Number",
		vf: kpv => kpv["TeamNumber"]
	}, {
		name: "Match Number",
		vf: kpv => kpv["MatchNumber"]
	}, {
		name: "Fits Under Trench?",
		vf: kpv => kpv["FitsUnderTrench"] ? "Yes" : "No"
	}, {
		name: "Plays Defense?",
		vf: kpv => kpv["PlaysDefense"] ? "Yes" : "No"
	}, {
		name: "Penalties",
		vf: kpv => {
			const red = kpv["RedCard"];
			const yellow = kpv["YellowCard"];

			if (red && yellow)  return "Red and Yellow";
			if (red)            return "Red";
			if (yellow)         return "Yellow";

			return "None";
		}
	}, {
		name: "Starting Pieces",
		vf: kpv => kpv["StartingPieces"]
	}, {
		name: "Line Position",
		vf: kpv => kpv["LinePosition"]
	}, {
		name: "Crosses Initiation Line?",
		vf: kpv => kpv["CrossesInitiationLine"] ? "Yes" : "No"
	}, {
		name: "Auto Low",
		vf: kpv => kpv["AutoLow"]
	}, {
		name: "Auto Outer",
		vf: kpv => kpv["AutoOuter"]
	}, {
		name: "Auto Inner",
		vf: kpv => kpv["AutoInner"]
	}, {
		name: "Auto Missed",
		vf: kpv => kpv["AutoMissed"]
	}, {
		name: "Autonomous Comments",
		vf: kpv => kpv["AutonomousComments"]
	}, {
		name: "Balls Picked Up From Loading Station",
		vf: kpv => kpv["BallsPickedUpFromLoadingStation"]
	}, {
		name: "Balls Picked Up From Floor",
		vf: kpv => kpv["BallsPickedUpFromFloor"]
	}, {
		name: "Tele-Op Low",
		vf: kpv => kpv["TeleLow"]
	}, {
		name: "Tele-Op Outer",
		vf: kpv => kpv["TeleOuter"]
	}, {
		name: "Tele-Op Inner",
		vf: kpv => kpv["TeleInner"]
	}, {
		name: "Tele-Op Missed",
		vf: kpv => kpv["TeleMissed"]
	}, {
		name: "Shoot From",
		vf: kpv => [kpv["TargetZone"]? "Target Zone" : "", kpv["TrenchZone"]? "Trench Zone" : "", kpv["Other"]? "Other" : ""]
			.filter(v => v !== "") // filter out none
			.join(", ") // make it look nice
	}, {
		name: "Rotation",
		vf: kpv => kpv["Rotation"] ? "Yes" : "No"
	}, {
		name: "Color",
		vf: kpv => kpv["Color"] ? "Yes" : "No"
	}, {
		name: "Teleop Comments",
		vf: kpv => kpv["TeleopComments"]
	}, {
		name: "Endgame Type",
		vf: kpv => kpv["EndgameType"]
	}, {
		name: "Balls Scored",
		vf: kpv => kpv["BallsScored"]
	}, {
		name: "Climb Height",
		vf: kpv => kpv["ClimbHeight"]
	}, {
		name: "Climb Position",
		vf: kpv => kpv["ClimbPosition"]
	}, {
		name: "Time",
		vf: kpv => kpv["Time"]
	}, {
		name: "Endgame Comments",
		vf: kpv => kpv["EndgameComments"]
	}];

	let csv = "";

	// make header
	const header = [];
	theHolyGrail.forEach(col => {
		// escape quotes
		const filteredCell = col.name.replaceAll("\"", "\"\"");
		// https://stackoverflow.com/a/566059/12894940
		// the quotes around the cell ensure the newlines and commas are encoded properly.
		header.push(`"${filteredCell}"`);
	});

	csv += header.join(",") + "\r\n";

	// now we make the body
	// loop through each match
	matches.forEach(match => {
		const kpv = match[1];
		const row = [];
		// loop through each column, and calculate the row's values.
		theHolyGrail.forEach(col => {
			const filteredCell =
				// the result needs to be a string so we can use .replaceAll
				("" + col.vf(kpv))
					// fix 2020#11
					.replaceAll("\"", "\"\"");

			row.push(`"${filteredCell}"`);
		});

		csv += row.join(",") + "\r\n";
	});
	return csv;
}