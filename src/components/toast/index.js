import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export function Toast(props) {
	const { title = '', type = 'error', label = '' } = props

	return (
		<View style={type === 'info' ? styles.containerInfo : styles.containerError}>
			{title ? <Text style={styles.title}>{title}</Text> : null}
			<Text style={styles.label}>{label}</Text>
		</View>
	)
}
