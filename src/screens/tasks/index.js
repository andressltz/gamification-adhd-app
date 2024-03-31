import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'

import styles from '../../styles'

export function TasksScreen() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
			<View style={styles.container}>

				<Text>TasksScreen</Text>

			</View>
		</SafeAreaView>
	)
}
