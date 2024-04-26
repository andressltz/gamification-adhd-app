import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import style from './styles'

export function SplashScreen(props) {
	return (
		<SafeAreaView style={style.safeArea}>
			<View style={style.container}>
				<Text style={style.label}>Tarefas Gamificadas</Text>
			</View>
		</SafeAreaView>
	)
}
