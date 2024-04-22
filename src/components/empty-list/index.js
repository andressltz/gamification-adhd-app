import React from 'react'

import { View, Text } from 'react-native'
import styles from './styles'

export function EmptyList(props) {
	const { canAdd = false, msg = 'Lista vazia', msgAdd = '' } = props

	return (
		<View style={styles.card}>
			<Text style={styles.message}>{msg}</Text>
			{canAdd ? <Text style={styles.message}>{msgAdd}</Text> : null}
		</View>
	)
}
