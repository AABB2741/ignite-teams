import { ThemeProvider } from "styled-components/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import theme from "@/theme";
import { Loading } from "@/components/loading";
import { StatusBar } from "react-native";
import { Routes } from "@/routes";

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
	});

	return (
		<ThemeProvider theme={theme}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			{fontsLoaded ? <Routes /> : <Loading />}
		</ThemeProvider>
	);
}
