import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// https://reactnavigation.org/docs/themes/
export default {
    default: DefaultTheme,

    dark: DarkTheme,

    green: {
        ...DefaultTheme,
        colors: {
            primary: "#6aa84f"
        }
    }
}

// auto, light, dark, green...?