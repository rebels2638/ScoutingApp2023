import { createSlice } from "@reduxjs/toolkit";

export const matchSlice = createSlice({
	name: "matchSlice",
	initialState: {
		matches: [],
	},
	reducers: {
		writeMatch: (state, action) => {
			// action is in format
			// [key, payload]
			// Tracer: ESCOURT THE PAYLOAD!

			const [matchKey, kpv] = action.payload;

			if (!(typeof matchKey === "string"))					console.log(`WARNING! Expected key to be string, instead got ${typeof matchKey}.`);
			if (!(kpv instanceof Array))							console.log(`WARNING! Expected match to be object, instead got ${typeof kpv}.`);
			if (!Object.values(kpv).every(v => v instanceof Array))	console.log(`WARNING! Expected each item to be an array, instead got ${typeof kpv[0]}.`);

			const mki = state.matches.findIndex(v => v && (v[0] === matchKey));

			if (mki === -1) {
				// if the match key is not found
				// push
				state.matches.push(action.payload);
			} else {
				// if the match key IS found
				// overwrite
				state.matches[mki] = action.payload;
			}
		},

		importMatches: (state, action) => {
			// should only be used when the app starts
			console.log("MATCHES HAVE BEEN IMPORTED!!!");
			// import that bad boy
			state.matches = action.payload;
		},

		resetMatches: (state) => {
			state.matches = [];
		}
	},
});

// dispatch(writeMatch(kpv))

export const { writeMatch, importMatches, resetMatches } = matchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMatches = state => state.matches.matches;

export default matchSlice.reducer;
