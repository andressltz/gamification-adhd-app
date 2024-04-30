import React from 'react'
import { Text, View } from 'react-native'
import { CheckBox } from 'react-native-web'
import styles from './styles'

export function Check(props) {
	const { style = {}, text = '', value = false, onValueChange = () => {} } = props

	return (
		<View style={styles.container}>
			<View style={styles.checkbox}>
				<CheckBox value={value} onValueChange={onValueChange} />
			</View>
			<Text style={styles.text}>{text}</Text>
		</View>
	)
}
