import { ThemeProvider } from "styled-components/native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Groups } from "@/screens/groups";
import theme from "@/theme";
import { Loading } from "@/components/loading";
import { StatusBar } from "react-native";
import { NewGroup } from "@/screens/new-group";
import { Players } from "@/screens/players";

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
			{fontsLoaded ? <Players /> : <Loading />}
		</ThemeProvider>
	);
}
