import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'

import styles from '../../styles'
import { api } from '../../services'
import { ItemCard } from '../../components'
import { COLORS } from '../../assets'

export function TasksScreen(props) {
	const { navigation } = props

	const [isLoading, setIsLoading] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			const resp = await api.get('/task')
			console.log(resp.data.data)
			setTasks(resp.data.data)
			setIsLoading(false)
		}
		getScreenData()
	}, [])

	function onButtonNewTaskPress() {
		navigation.navigate('NewTaskScreen', [])
	}

	function renderContent() {
		if (isLoading) {
			return (
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
					<View style={styles.loaderContainer}>
						<ActivityIndicator size='large' />
						{/* <Button label='Nova tarefa' onPress={() => onButtonNewTaskPress()} /> */}
					</View>
				</SafeAreaView>
			)
		}

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
				<FlatList
					numColumns={1}
					data={tasks}
					renderItem={({ item }) => (
						<ItemCard
							title={item.title}
							qtyStars={item.qtyStars}
							dateToStart={item.dateToStart}
							timeToStart={item.timeToStart}
							duration={item.timeToDo}
							status={item.status}
							id={item.id}
							// onPress={() => onButtonPress(item.name, item.id)}
							// empty={item.empty}
							keyExtractor={item.id}
						/>
					)}
				/>
			</SafeAreaView>
		)
	}

	return renderContent()
}
