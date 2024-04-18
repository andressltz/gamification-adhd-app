import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'

import styles from '../../styles'
import { COLORS } from '../../assets'

export function ProfileScreen() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
			<View style={styles.container}>
				<Text>ProfileScreen</Text>
			</View>
		</SafeAreaView>
	)
}
