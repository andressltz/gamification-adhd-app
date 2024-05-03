import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import { COLORS } from '../../assets'
import { StopWatch, Toast } from '../../components'
import { TaskFinishModal } from '../../modals'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'
import style from './styles'

const api = ApiClient()

export function TaskDetailScreen({ route, navigation }) {
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [modalTaskFinishVisible, setModalTaskFinishVisible] = useState(false)
	const [isStopwatchStart, setIsStopwatchStart] = useState(false)
	const [resetStopwatch, setResetStopwatch] = useState(false)
	const [startTimeStopWatch, setStartTimeStopWatch] = useState(0)
	const StopwatchOptions = {
		container: {},
		text: {
			fontSize: 30,
			marginLeft: 5,
			textAlign: 'center',
		},
	}

	const [task, setTask] = useState({})
	const idTask = route.params.idTask

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			setHasError(false)

			await api.get(`/task/${idTask}`).then((response) => {
				if (response?.data?.data) {
					setTask(response.data.data)
					setStartTimeStopWatch(task.currentDuration ? task.currentDuration : 0)
					setHasError(false)
					setIsStopwatchStart(true)
					setResetStopwatch(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}

				setIsLoading(false)
			})
		}
		getScreenData()
	}, [route, idTask, task.currentDuration])

	async function stopTaskAction() {
		if (idTask) {
			setIsLoading(true)
			setHasError(false)
			await api.post(`/task/${idTask}/stop`).then((response) => {
				if (response?.data?.data) {
					setHasError(false)
					navigation.navigate('TasksScreen')
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
				setIsLoading(false)
			})
		}
	}

	async function finishTaskAction() {
		if (idTask) {
			setIsLoading(true)
			setHasError(false)
			await api.post(`/task/${idTask}/finish`).then((response) => {
				if (response?.data?.data) {
					setHasError(false)
					setModalTaskFinishVisible(true)
				} else {
					setHasError(true)
					setErrorMessage(response)
					setModalTaskFinishVisible(false)
				}
				setIsLoading(false)
			})
		}
	}

	function onPressStop() {
		stopTaskAction()
	}

	function onPressFinish() {
		finishTaskAction()
	}

	function onButtonModalClosePress() {
		setModalTaskFinishVisible(false)
	}

	function onButtonModalFinishPress() {
		setModalTaskFinishVisible(false)
		navigation.navigate('TasksScreen')
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

				{task && modalTaskFinishVisible ? (
					<TaskFinishModal
						modalTaskVisible={modalTaskFinishVisible}
						task={task}
						onPressBack={() => onButtonModalClosePress()}
						onPressFinish={() => onButtonModalFinishPress()}
					/>
				) : null}

				<View style={globalStyles.container}>
					<Text style={style.title}>{task.title}</Text>

					{task.steps ? (
						<View style={style.itemsContainer}>
							<FlatList numColumns={1} data={task.steps} renderItem={({ item }) => <Text style={style.stepItem}>{item}</Text>} />
						</View>
					) : null}

					{task.description ? (
						<View style={style.itemsContainer}>
							<Text style={style.description}>- {task.description}</Text>
						</View>
					) : null}

					<View style={style.actions}>
						<StarRatingDisplay
							rating={task.qtyStars}
							starSize={35}
							emptyColor={COLORS.GREY}
							color={COLORS.YELLOW}
							starStyle={{ marginHorizontal: 0 }}
						/>
					</View>
					<View style={style.actions}>
						<View style={style.clockContainer}>
							<IoniconsIcon name='alarm-outline' size={40} color={COLORS.BLACK} />
							<StopWatch
								startTime={startTimeStopWatch}
								start={isStopwatchStart}
								reset={resetStopwatch}
								options={StopwatchOptions}
								// getTime={(time) => {
								// 	console.log(time)
								// }}
							/>
						</View>
					</View>
					<View style={style.actions}>
						<TouchableOpacity
							activeOpacity={0.6}
							style={[style.actionButton, style.blueBorder]}
							onPress={() => {
								setIsStopwatchStart(!isStopwatchStart)
								setResetStopwatch(false)
							}}>
							<FontAwesomeIcon name='pause' size={25} color={COLORS.BLUE} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							style={[style.actionButton, style.redBorder]}
							onPress={() => {
								setIsStopwatchStart(!isStopwatchStart)
								setResetStopwatch(false)
								onPressStop()
							}}>
							<FontAwesomeIcon name='stop' size={25} color={COLORS.RED} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							style={[style.actionButton, style.greenBorder]}
							onPress={() => {
								setIsStopwatchStart(!isStopwatchStart)
								setResetStopwatch(false)
								onPressFinish()
							}}>
							<FontAwesomeIcon name='check' size={25} color={COLORS.GREEN_PRIM} />
						</TouchableOpacity>
					</View>
					<View style={style.actions}>{/* <Text style={style.title}>progress bar</Text> */}</View>
				</View>
			</View>
		)
	}

	return renderContent()
}
