import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList, ActivityIndicator, useColorScheme } from 'react-native'
import { FAB } from '@rneui/themed'

import styles from '../../styles'
import { ApiClient } from '../../services'
import { ItemCard, Toast } from '../../components'
import { COLORS } from '../../assets'
import { COLORS_DARK } from '../../assets'

const api = ApiClient()

export function TasksScreen({ route, navigation }) {
	// const isDarkMode = useColorScheme() === 'dark';
	// const COLORSCHEME = isDarkMode ? COLORS_DARK : COLORS

	const { patientId, patientName } = route.params

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [isLoading, setIsLoading] = useState(false)
	const [tasks, setTasks] = useState([])

	useLayoutEffect(() => {
		if (patientName) {
			navigation.setOptions({ title: `Tarefas de ${patientName}` })
		}
	}, [patientName, navigation])

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			if (patientId) {
				const response = await api.get(`/task/${patientId}`)
				if (response?.data?.data) {
					setTasks(response.data.data)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			} else {
				const response = await api.get('/task')
				if (response?.data?.data) {
					setTasks(response.data.data)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			}
			setIsLoading(false)
		}
		getScreenData()
	}, [route])

	function onButtonNewTaskPress() {
		navigation.navigate('NewTaskScreen', [])
	}

	function renderContent() {
		if (isLoading) {
			return (
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.loaderContainer}>
						<ActivityIndicator size='large' />
					</View>
				</SafeAreaView>
			)
		}

		return (
			<SafeAreaView style={styles.safeArea}>
				{hasError ? <Toast label={errorMessage} /> : null}

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
				<FAB
					size='large'
					placement='right'
					onPress={() => onButtonNewTaskPress()}
					color={COLORS.GREEN_PRIM}
					icon={{
						name: 'add',
						color: 'white',
					}}
				/>
			</SafeAreaView>
		)
	}

	return renderContent()
}
