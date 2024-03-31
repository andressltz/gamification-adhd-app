import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'

import styles from '../../styles'

export function ProfileScreen() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
			<View style={styles.container}>

				<Text>ProfileScreen</Text>

			</View>
		</SafeAreaView>
	)
}
