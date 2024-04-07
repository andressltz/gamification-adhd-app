import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

import styles from '../../styles'
import { Button } from '../../components'

export function TasksScreen(props) {
	const {navigation} = props

	function onPressCard() {
    navigation.navigate('TasksScreen')
  }

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
			<View style={styles.container}>

				<Text>TasksScreen</Text>
				<Button onPressCard={() => onPressCard()}>Click aqui</Button>

			</View>
		</SafeAreaView>
	)
}
