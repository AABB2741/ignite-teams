import logoImg from "@/assets/logo.png";

import { BackButton, BackIcon, Container, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
	showBackButton?: boolean;
}

export function Header({ showBackButton }: HeaderProps) {
	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	return (
		<Container>
			{showBackButton && (
				<BackButton onPress={handleGoBack}>
					<BackIcon />
				</BackButton>
			)}
			<Logo source={logoImg} />
		</Container>
	);
}
