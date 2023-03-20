function TakeTheSoulFromGrids(kpv, gridID) {
	// empty grid with 3 rows, 9 columns
	let grid = new Array(3).fill(new Array(9).fill(0));

	// 0 is Cone, 1 is Box, 2 is ConeBox
	const boxes = [[0, 1, 0,    0, 1, 0,    0, 1, 0],
				[0, 1, 0,    0, 1, 0,    0, 1, 0],
				[2, 2, 2,    2, 2, 2,    2, 2, 2]];
				
	// 0 is None, 1 is Cone, 2 is Cube
	// map answer based on whether it's a cube/cone/cubecone
	grid = boxes.map((row, i) => row.map((v, o) => {
		// ConeButton and ConeBoxButton both return their normal values,
		// but for CubeButton, it needs to manually be mapped to the correct values
		// check if it's a CubeButton with (v===1) and add the correct multiplier
		return kpv[`${gridID}-${i}-${o}`] * ((v === 1)? 2 : 1);
	}));

	// get it into the format Vincent wants it in
	grid = grid.map(row => row.map(v => ["na", "cn", "cb"][v]));

	return grid.map(row => row.join(",")).join("|");
}

// the holy grail contains all the data for converting the kpv's to one giant csv file
const theHolyGrail = [
	{ // match info
		name: "Match Type",
		vf: kpv => ["Practice", "Qual", "Playoff"][kpv["MatchType"]]
	}, {
		name: "Match Number",
		vf: kpv => kpv["MatchNumber"]
	}, {
		name: "Alliance",
		vf: kpv => ["Blue", "Red"][kpv["Team"]]
	}, {
		name: "Team Number",
		vf: kpv => kpv["TeamNumber"]
	},  {
		name: "Starting Position",
		vf: kpv => ["Left", "Mid", "Right"][kpv["StartingPosition"]]
	},

	// auto
	{
		name: "Taxi",
		vf: kpv => +kpv["Taxi"]
	}, {
		name: "Auto Position Scored",
		vf: kpv => TakeTheSoulFromGrids(kpv, "AutoGrid")
	},
	
	
	
	
	{
		name: "Starting Pieces",
		vf: kpv => kpv["StartingPieces"]? "Yes" : "No"
	}, {
		name: "Auto Upper Scored",
		vf: kpv => kpv["AutoUpperHubScored"]
	}, {
		name: "Auto Lower Scored",
		vf: kpv => kpv["AutoLowerHubScored"]
	}, {
		name: "Auto Upper Missed",
		vf: kpv => kpv["AutoUpperHubMissed"]
	}, {
		name: "Auto Lower Missed",
		vf: kpv => kpv["AutoLowerHubMissed"]
	}, {
		name: "Picked Up",
		vf: kpv => 
			["AutoBP1", "AutoBP2", "AutoBP3", "AutoBP4", "AutoBP5"]
				.map((v, i) => kpv[v]? i+1 : -1)    // convert valid to their index+1, invalid to -1
				.filter(v => v !== -1)              // filter invalid
				.join(", ")                         // make it pretty
				|| "None"                           // set a default of "None"
	}, {
		name: "Autonomous Comments",
		vf: kpv => kpv["AutonomousComments"]
	},

	// other (penalties/cards/breakdown)
	{
		name: "Penalties",
		vf: kpv => {
			const red = kpv["RedCard"];
			const yellow = kpv["YellowCard"];

			if (red && yellow) return "Red and Yellow";
			if (red)           return "Red";
			if (yellow)        return "Yellow";

			return "None";
		}
	}, {
		name: "Fouls",
		vf: kpv => {
			const fouls = kpv["FoulCount"];
			
			return fouls? 
				`${fouls} fouls` :
				"No Fouls";
		}
	}, {
		name: "Breakdown",
		vf: kpv => {
			return kpv["Breakdown"]? "Yes" : "No";
		}
	},

	// tele
	{
		name: "Picks From Ground",
		vf: kpv => kpv["PicksFromGround"]? "Yes" : "No"
	}, {
		name: "Plays Defense",
		vf: kpv => kpv["PlaysDefense"]? "Yes" : "No"
	}, {
		name: "Human Player",
		vf: kpv => kpv["HPStation"]? "Yes" : "No"
	}, {
		name: "Tele Upper Scored",
		vf: kpv => kpv["TeleopUpperHubScored"]
	}, {
		name: "Tele Lower Scored",
		vf: kpv => kpv["TeleopLowerHubScored"]
	}, {
		name: "Tele Upper Missed",
		vf: kpv => kpv["TeleopUpperHubMissed"]
	}, {
		name: "Tele Lower Missed",
		vf: kpv => kpv["TeleopLowerHubMissed"]
	}, {
		name: "Teleop Comments",
		vf: kpv => kpv["TeleopComments"]
	},

	// endgame
	{
		name: "Failed Climb Position",
		vf: kpv => kpv["FailedClimbPosition"]? "Yes" : "No"
	}, {
		name: "Climb Position",
		vf: kpv => kpv["ClimbPosition"]
	}, {
		name: "Time",
		vf: kpv => {
			const seconds = kpv["Time"];
			/*const fMinutes = (seconds - (seconds % 60)) / 60;
			const fSeconds = ((seconds % 60) + "").padStart(2, "0");
			return `${fMinutes}:${fSeconds}`*/
			
			// don't bother formatting, just return raw seconds
			return seconds;
		}
	}, {
		name: "Endgame Comments",
		vf: kpv => kpv["EndgameComments"]
	}
];



// as the name suggests, kpvToCsv takes the important parts of the kpv, and converts it into a neat csv.
// matches: KPV[]
export default function kpvToCsv(matches) {
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

// this is specifically for the QR code generation
export function kpvToString(match) {
	let result = "";

	const kpv = match[1];
	const row = [];
	// loop through each column, and calculate the row's values.
	theHolyGrail.forEach(col => {
		const filteredCell =
			// the result needs to be a string so we can use .replaceAll
			("" + col.vf(kpv))
				// fix 2020#11
				.replaceAll("\"", "\"\"");
		row.push(`${filteredCell}`);
	});
	result += row.join(";") + "\r\n";

	return result;
}