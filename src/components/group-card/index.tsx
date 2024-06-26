import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

export interface GroupCardProps extends TouchableOpacityProps {
	title: string;
}

export function GroupCard({ title, ...rest }: GroupCardProps) {
	return (
		<Container {...rest}>
			<Icon />
			<Title>{title}</Title>
		</Container>
	);
}
