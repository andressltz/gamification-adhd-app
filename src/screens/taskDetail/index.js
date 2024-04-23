import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconI from 'react-native-vector-icons/Ionicons'
import { Stopwatch } from 'react-native-stopwatch-timer'

import styles from '../../styles'
import style from './styles'
import { ApiClient } from '../../services'
import { Toast } from '../../components'
import { COLORS } from '../../assets'

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
	const idTask = route.params.idTask

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)

			const response = await api.get(`/task/${idTask}`)
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
		}
		getScreenData()
	}, [route])

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

				<View style={styles.container}>
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
							<IconI name='alarm-outline' size={40} color={COLORS.BLACK} />
							<Stopwatch
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
							<Icon name='pause' size={25} color={COLORS.BLUE} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.6}
							style={[style.actionButton, style.redBorder]}
							onPress={() => {
								setIsStopwatchStart(!isStopwatchStart)
								setResetStopwatch(false)
							}}>
							<Icon name='stop' size={25} color={COLORS.RED} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6} style={[style.actionButton, style.greenBorder]}>
							<Icon name='check' size={25} color={COLORS.GREEN_PRIM} />
						</TouchableOpacity>
					</View>
					<View style={style.actions}>{/* <Text style={style.title}>progress bar</Text> */}</View>
				</View>
			</SafeAreaView>
		)
	}

	return renderContent()
}
