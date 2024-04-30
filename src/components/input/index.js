import React from 'react'
import { Text, TextInput, View } from 'react-native'
import styles from './styles'

export function Input(props) {
	const { style = {}, label = '', type = 'default', value = '', placeholder = '', onChangeText = () => {} } = props

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[styles.mainInput, style]}
				keyboardType={type}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	)
}
