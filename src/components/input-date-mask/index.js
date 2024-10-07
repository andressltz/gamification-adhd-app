import React from 'react'
import { Text, View } from 'react-native'
import MaskInput from 'react-native-mask-input'
import { COLORS } from '../../assets'
import styles from './styles'

export function InputDateMask(props) {
	const {
		style = {},
		label = '',
		type = 'default',
		inputMode = undefined,
		value = '',
		placeholder = '',
		autoCorrect = true,
		autoCapitalize = 'sentences',
		onChangeText = () => {},
		readOnly = false,
		mask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
	} = props

	return (
		<View style={styles.container}>
			<Text style={[styles.label, readOnly ? styles.disabled : styles.enabled]}>{label}</Text>
			<MaskInput
				style={[styles.mainInput, style, readOnly ? styles.disabled : styles.enabled]}
				keyboardType={type}
				inputMode={inputMode}
				placeholder={placeholder}
				placeholderTextColor={COLORS.GREY_DARK}
				value={value}
				onChangeText={(masked, unmasked) => {
					onChangeText(unmasked)
				}}
				autoCorrect={autoCorrect}
				autoCapitalize={autoCapitalize}
				readOnly={readOnly}
				disabled={readOnly}
				mask={mask}
			/>
		</View>
	)
}
