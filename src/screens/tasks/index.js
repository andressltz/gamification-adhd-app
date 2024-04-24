import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList, ActivityIndicator, Modal, Text, TouchableOpacity } from 'react-native'
import { FAB } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from '../../styles'
import style from './styles'
import { ApiClient } from '../../services'
import { ItemCard, Toast, EmptyList } from '../../components'
import { COLORS } from '../../assets'
import { TaskSinopseModal } from '../../modals'

const api = ApiClient()

export function TasksScreen({ route, navigation }) {
	// const isDarkMode = useColorScheme() === 'dark';
	// const COLORSCHEME = isDarkMode ? COLORS_DARK : COLORS

	const { patientId, patientName } = route.params
	const [isPatient, setIsPatient] = useState(false)

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [isLoading, setIsLoading] = useState(false)
	const [tasks, setTasks] = useState([])
	const [selectedTask, setSelectedTask] = useState(undefined)
	const [modalTaskVisible, setModalTaskVisible] = useState(false)

	const emptyMsg = 'Nenhuma tarefa cadastrada.'
	const emptyMsgAdd = 'Para cadastrar, selecione um paciente em Perfil.'

	useEffect(() => {
		getStorageUserType().then((userType) => {
			if (userType === 'PATIENT') {
				setIsPatient(true)
			} else {
				setIsPatient(false)
			}
		})
	}, [])

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

	function onButtonModalClosePress() {
		setSelectedTask(undefined)
		setModalTaskVisible(false)
	}

	function onButtonTaskPress(idTask) {
		if (isPatient) {
			// setSelectedTask(task)
			// setModalTaskVisible(true)
			navigation.navigate('TaskDetailScreen', { idTask })
		} else if (!isPatient && patientId) {
			navigation.navigate('NewTaskScreen', { idTask })
		}
	}

	const getStorageUserType = async () => {
		return await AsyncStorage.getItem('@App:userType')
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

				{/* <TaskSinopseModal
					visible={() => modalTaskVisible}
					task={() => selectedTask}
					onPressClose={() => onButtonModalClosePress()}
				/> */}
				{/* onPressStart */}

				{selectedTask ? (
					<Modal
						animationType='slide'
						visible={modalTaskVisible}
						presentationStyle='formSheet'
						// transparent={true}
						onRequestClose={() => {
							onButtonModalClosePress()
						}}>
						<SafeAreaView style={styles.safeArea}>
							<View style={styles.container}>
								<Text style={style.title}>Detalhes da tarefa</Text>
								<Text style={style.title}>({selectedTask.title})</Text>

								{selectedTask.steps ? (
									<View style={style.itemsContainer}>
										<FlatList
											numColumns={1}
											data={selectedTask.steps}
											renderItem={({ item }) => <Text style={style.stepItem}>{item}</Text>}
										/>
									</View>
								) : null}

								{selectedTask.description ? (
									<View style={style.itemsContainer}>
										<Text style={style.description}>{selectedTask.description}</Text>
									</View>
								) : null}

								<TouchableOpacity
									activeOpacity={0.6}
									style={[style.actionButton, style.blueBorder]}
									onPress={() => onButtonModalClosePress()}
								>
								</TouchableOpacity>
							</View>
						</SafeAreaView>
					</Modal>
				) : null}

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
							onPress={() => onButtonTaskPress(item.id)}
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
