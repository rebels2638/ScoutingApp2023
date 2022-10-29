import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// https://reactnavigation.org/docs/themes/
// you can build off of existing themes, and just add whatever changes you want afterwards
export default {
    light: {...DefaultTheme, colors: {border: "#000"}},
    dark: {...DarkTheme},
    green: {...DefaultTheme, colors: {primary: "#6aa84f", background: "#84c966"}}
}

// auto, light, dark, green...?