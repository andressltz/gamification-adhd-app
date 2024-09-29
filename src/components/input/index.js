import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { COLORS } from '../../assets'
import styles from './styles'

export function Input(props) {
	const {
		style = {},
		label = '',
		type = 'default',
		inputMode = undefined,
		value = '',
		placeholder = '',
		autoCorrect = true,
		autoCapitalize = 'sentences',
		secureTextEntry = false,
		onChangeText = () => {},
		readOnly = false,
	} = props

	return (
		<View>
			<Text style={[styles.label, readOnly ? styles.disabled : styles.enabled]}>{label}</Text>
			<TextInput
				style={[styles.mainInput, style, readOnly ? styles.disabled : styles.enabled]}
				keyboardType={type}
				inputMode={inputMode}
				placeholder={placeholder}
				placeholderTextColor={COLORS.GREY_DARK}
				value={value}
				onChangeText={onChangeText}
				autoCorrect={autoCorrect}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
				readOnly={readOnly}
				disabled={readOnly}
			/>
		</View>
	)

	// to show password on form: https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-react-native/
}
