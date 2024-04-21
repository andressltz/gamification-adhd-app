import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import styles from './styles'

export function SplashScreen(props) {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.label}>TDAH APP</Text>
			</View>
		</SafeAreaView>
	)
}
