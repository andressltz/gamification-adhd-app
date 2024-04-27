import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import { COLORS } from '../../assets'
import { Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'
import style from './styles'

const api = ApiClient()

export function TaskDetailScreen({ route, navigation }) {
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

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

	const [isLoading, setIsLoading] = useState(false)
	const [task, setTask] = useState({})
	const idTask = route.params.id

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

				<View style={globalStyles.container}>
					<Text style={style.title}>{task.title}</Text>

					{task.steps ? (
						<View style={style.itemsContainer}>
							<FlatList numColumns={1} data={task.steps} renderItem={({ item }) => <Text style={style.stepItem}>{item}</Text>} />
						</View>
					) : null}

					{task.description ? (
						<View style={style.itemsContainer}>
							<Text style={style.description}>{task.description}</Text>
						</View>
					) : null}

					<View style={style.actions}></View>
					<View style={style.actions}>
						<View style={style.clockContainer}>{/* <IoniconsIcon name='alarm-outline' size={40} color={COLORS.BLACK} /> */}</View>
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
							}}>
							<FontAwesomeIcon name='stop' size={25} color={COLORS.RED} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6} style={[style.actionButton, style.greenBorder]}>
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
