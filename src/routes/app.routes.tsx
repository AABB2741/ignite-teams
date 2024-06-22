import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Groups } from "@/screens/groups";
import { Players } from "@/screens/players";
import { NewGroup } from "@/screens/new-group";

const Stack = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="groups" component={Groups} />
			<Stack.Screen name="new" component={NewGroup} />
			<Stack.Screen name="players" component={Players} />
		</Stack.Navigator>
	);
}
