import {
	View,
	ImageBackground
} from "react-native";

import { selectID, setDefault } from "../../Redux/Features/dataSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function GridArena(props) {
	const dispatch = useDispatch();
	const arenaID = "Team";

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const selectedTeam = useSelector(selectID(arenaID));

    // each item should be in the form
    // { pos: (x, y), com: component }
    // x and y being floats from 0-1. 0 will be top left, 1 will be bottom right.
    // com should be the component to render
    const items = props.items || [];
    // hopefully this makes positioning easier

	const width = 900,
		  height = 453;

	return (
		<View>
			<ImageBackground
				source={require("../../Assets/2022Field.png")}
				style={{
					width: width,
					height: height,
					marginTop: 20
				}}
				imageStyle={{ borderRadius: 10 }}
			>
				{/** this.props.items
				  * in an effort to make item positioning easier, we have a custom arena wrapper
				  * GridArena allows us to specify an X and a Y as a percentage (float 0-1)
				  * It places the top left corner of the component at the specified coord
				  * 
				  * maybe we can change it to place the middle of the component at the coord?
				  * we would need to know the height and width of the component though, so we'd 
				  * need to render it once to get the dimensions, then again to re-position
				  * 
				  * follows the format
				  * [{pos: (percentage, percentage), com: ()=>JSX}] 
				  * 
				  * GOTCHA: com needs to be a function. If you get an error about "expected string literal
				  * 		but got JSX", just wrap the component in an arrow function or something
				  *                             the fix
				  * <Text>natsumi</Text>         ---->        () => <Text>natsumi</Text>
				  **/
				items.map((item, index) => {
					// { pos: (x, y), com: component }
					const [x, y] = item.pos;
					const key = `${item.pos}-ground beef-${index}`;
					console.log(key);
					
					if (selectedTeam == 0) {
						return (
							<View style={{ position: "absolute", left: width*x, top: height*y, key: key }}>
								<item.com/>
							</View>
						);
					} else {
						return (
							<View style={{ position: "absolute", right: width*x, bottom: height*y, key: key }}>
								<item.com/>
							</View>
						);
					}
				})}
			</ImageBackground>
		</View>
	);
}
