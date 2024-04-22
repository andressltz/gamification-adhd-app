import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList, ActivityIndicator, useColorScheme } from 'react-native'
import { FAB } from '@rneui/themed'

import styles from '../../styles'
import { ApiClient } from '../../services'
import { ItemCard, Toast, EmptyList } from '../../components'
import { COLORS } from '../../assets'
import { COLORS_DARK } from '../../assets'

const api = ApiClient()

export function TasksScreen({ route, navigation }) {
	// const isDarkMode = useColorScheme() === 'dark';
	// const COLORSCHEME = isDarkMode ? COLORS_DARK : COLORS

	const { patientId, patientName } = route.params
	const isPatient = false // TODO fix it

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [isLoading, setIsLoading] = useState(false)
	const [tasks, setTasks] = useState([])

	const emptyMsg = 'Nenhuma tarefa cadastrada.'
	const emptyMsgAdd = 'Para cadastrar, selecione um paciente em Perfil.'

	useLayoutEffect(() => {
		if (patientName) {
			navigation.setOptions({ title: `Tarefas de ${patientName}` })
		}
	}, [patientName, navigation])

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			if (patientId) {
				const response = await api.get(`/task/user/${patientId}`)
				if (response?.data?.data) {
					setTasks(response.data.data)
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			} else {
				const response = await api.get('/task')
				if (response?.data?.data) {
					setTasks(response.data.data)
					setHasError(false)
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

	// function getUserType(type) {
		// const token = await AsyncStorage.getItem('@App:token')
	// 	if (type === 'PARENT' || type === 1) {
	// 		return 'Responsável'
	// 	} else if (type === 'PATIENT' || type === 2) {
	// 		return ''
	// 	} else if (type === 'PROFESSIONAL' || type === 3) {
	// 		return 'Profissional'
	// 	} else {
	// 		return ''
	// 	}
	// }

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
					ListEmptyComponent={() => <EmptyList canAdd={!isPatient} msg={emptyMsg} msgAdd={emptyMsgAdd} />}
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
							keyExtractor={item.id}
						/>
					)}
				/>
				<FAB
					size='large'
					placement='right'
					visible={!isPatient && patientId ? true : false}
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
