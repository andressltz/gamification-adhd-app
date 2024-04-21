import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'

import styles from '../../styles'
import { COLORS } from '../../assets'

export function MessagesScreen() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text>MessagesScreen</Text>
			</View>
		</SafeAreaView>
	)
}
