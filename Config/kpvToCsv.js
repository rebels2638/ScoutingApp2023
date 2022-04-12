// as the name suggests, kpvToCsv takes the important parts of the kpv, and converts it into a neat csv.

// matches: KPV[]
export default function kpvToCsv(matches) {
	// the holy grail contains all the data for converting the kpv's to one giant csv file
	const theHolyGrail = [{ // match info
		name: "Team Number",
		vf: kpv => kpv["TeamNumber"]
	}, {
		name: "Match Number",
		vf: kpv => kpv["MatchNumber"]
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
	
	// auto
	{
		name: "Starting Pieces",
		vf: kpv => kpv["StartingPieces"]? "Yes" : "No"
	}, {
		name: "Starting Position",
		vf: kpv => kpv["StartingPosition"]
	}, {
		name: "Taxi",
		vf: kpv => kpv["Taxi"]? "Yes" : "No"
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