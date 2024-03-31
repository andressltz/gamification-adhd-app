import React from 'react';

import {Text, TextInput, View} from 'react-native';
import styles from './styles';

export function Input(props) {
	const {
		placeholderTextColor = '#000000',
		style = {},
		label = '',
		type = 'default',
		...otherProps
	} = props;

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				placeholderTextColor={placeholderTextColor}
				style={[styles.mainInput, style]}
				{...otherProps}
				keyboardType={type}
			/>
		</View>
	);
}
