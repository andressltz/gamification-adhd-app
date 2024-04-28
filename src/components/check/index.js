import React from 'react'
import { Text, View } from 'react-native'
import { CheckBox } from 'react-native-web'
import styles from './styles'

export function Check(props) {
	const { style = {}, text = '', ...otherProps } = props

	return (
		<View style={styles.container}>
			<View style={styles.checkbox}>
				<CheckBox {...otherProps} />
			</View>
			<Text style={styles.text}>{text}</Text>
		</View>
	)
}
