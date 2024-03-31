import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'

import styles from '../../styles'

export function MessagesScreen() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
			<View style={styles.container}>

				<Text>MessagesScreen</Text>

			</View>
		</SafeAreaView>
	)
}
