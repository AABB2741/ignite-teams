import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";
import React, { forwardRef } from "react";

interface InputProps extends TextInputProps {}

export const Input = forwardRef<TextInput, InputProps>(({ ...rest }, ref) => {
	const { COLORS } = useTheme();

	return (
		<Container ref={ref} placeholderTextColor={COLORS.GRAY_300} {...rest} />
	);
});

Input.displayName = "Input";
