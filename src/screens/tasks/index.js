import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { EmptyList, ItemCard, Toast } from '../../components'
import { TaskSinopseModal } from '../../modals'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function TasksScreen({ route, navigation }) {
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

	async function startTaskAction(idTask) {
		if (selectedTask && idTask) {
			setIsLoading(true)
			setHasError(false)
			await api.post(`/task/${idTask}/start`).then((response) => {
				if (response?.data?.data) {
					setTasks(response.data.data)
					setHasError(false)
					navigation.navigate('TaskDetailScreen', { idTask })
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
				setModalTaskVisible(false)
				setSelectedTask(undefined)
				setIsLoading(false)
			})
		}
	}

	function onButtonNewTaskPress() {
		navigation.navigate('NewTaskScreen', [])
	}

	function onButtonModalClosePress() {
		setSelectedTask(undefined)
		setModalTaskVisible(false)
	}

	function onButtonModalStartPress() {
		const { id } = selectedTask
		startTaskAction(id)
	}

	function onButtonTaskPress(task, idTask) {
		if (isPatient) {
			setSelectedTask(task)
			setModalTaskVisible(true)
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
				<View style={globalStyles.loaderContainer}>
					<ActivityIndicator size='large' />
				</View>
			)
		}

		return (
			<View>
				{hasError ? <Toast label={errorMessage} /> : null}

				{selectedTask && modalTaskVisible ? (
					<TaskSinopseModal
						modalTaskVisible={modalTaskVisible}
						task={selectedTask}
						onPressClose={() => onButtonModalClosePress()}
						onPressStart={() => onButtonModalStartPress()}
					/>
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
							onPress={() => onButtonTaskPress(item, item.id)}
							keyExtractor={item.id}
						/>
					)}
				/>
				{/* <FAB
					size='large'
					placement='right'
					visible={!isPatient && patientId ? true : false}
					onPress={() => onButtonNewTaskPress()}
					color={COLORS.GREEN_PRIM}
					icon={{
						name: 'add',
						color: 'white',
					}}
				/> */}
			</View>
		)
	}

	return renderContent()
}
