import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { Button, Check, CompDatePicker, CompDurationPicker, Input, Selection, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function EditTaskScreen(props) {
	const { navigation, route } = props
	const { idTask, patientId, patientName } = route.params

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [achievementOptions, setAchievementOptions] = useState([])

	const [task, setTask] = useState(null)
	const [title, setFormTitle] = useState(null)
	const [description, setFormDescription] = useState(null)
	const [qtyStars, setFormQtyStars] = useState(null)
	const [lostStarDoNotDo, setLostStarDoNotDo] = useState(null)
	const [lostStarDelay, setLostStarDelay] = useState(null)
	const [dateToStart, setDateToStart] = useState(new Date())
	const [duration, setFormDuration] = useState(0)
	const [hasAchievement, setFormHasAchievement] = useState(null)
	const [achievement, setFormAchievement] = useState(null)

	const qtyStarOptions = [
		{ label: '1 estrela', value: 1 },
		{ label: '2 estrelas', value: 2 },
		{ label: '3 estrelas', value: 3 },
		{ label: '4 estrelas', value: 4 },
		{ label: '5 estrelas', value: 5 },
	]

	useEffect(() => {
		async function getAchievementOptions() {
			setIsLoading(true)
			if (patientId) {
				const response = await api.get(`/achievement/user/${patientId}/available`)
				if (response?.data?.data) {
					const newArray = []
					response.data.data.forEach((element) => {
						newArray.push({ label: element.title, value: element.id })
					})
					setAchievementOptions(newArray)
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			}
			setIsLoading(false)
		}
		getAchievementOptions()
	}, [props])

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			setHasError(false)

			await api.get(`/task/${idTask}`).then((response) => {
				if (response?.data?.data) {
					setTask(response.data.data)
					setFormTitle(response.data.data.title)
					setFormDescription(response.data.data.description)
					setFormQtyStars(response.data.data.qtyStars)
					// setLostStarDoNotDo(response.data.data.lostStarDoNotDo)
					setLostStarDelay(response.data.data.lostStarDelay)
					setDateToStart(response.data.data.dateToStart)
					setFormDuration(response.data.data.timeToDo)
					setFormHasAchievement(response.data.data.hasAchievement)
					setFormAchievement(response.data.data.achievementId)

					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}

				setIsLoading(false)
			})
		}
		getScreenData()
	}, [route, navigation])

	async function onButtonSavePress() {
		const response = await api.patch(`/task/${idTask}`, {
			id: idTask,
			status: task.status,
			title: title,
			description: description,
			qtyStars: qtyStars,
			lostStarDoNotDo: lostStarDoNotDo,
			lostStarDelay: lostStarDelay,
			dateToStart: dateToStart,
			timeToStart: dateToStart,
			timeToDo: duration,
			hasAchievement: hasAchievement,
			achievementId: achievement,
			patient: { id: patientId },
			ownerId: 1,
		})
		if (response?.data?.data) {
			navigation.navigate('TasksScreen', { patientId: patientId, patientName: patientName })
		} else {
			setHasError(true)
			setErrorMessage(response)
		}
	}

	function myUseState(bool) {
		return useState(bool)
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
			<View style={globalStyles.containerScroll}>
				<ScrollView style={globalStyles.scrollview}>
					{hasError ? <Toast label={errorMessage} /> : null}

					<Input label='Título da tarefa:*' placeholder='Ex: Arrumar guarda roupa' onChangeText={setFormTitle} value={title} />

					<Input
						label='Orientações da tarefa:*'
						placeholder='Ex: Dobrar todas as roupas'
						onChangeText={setFormDescription}
						value={description}
					/>

					<Selection
						label='Quantidade de estrelas:'
						values={qtyStarOptions}
						value={qtyStars}
						onSelect={(item) => {
							setFormQtyStars(item.value)
						}}
					/>

					{/* <Check
						text='Perde estrelas se não realizar a tarefa'
						value={lostStarDoNotDo}
						onValueChange={(val) => setLostStarDoNotDo(val)}
					/> */}

					<Check text='Perde estrelas se atrasar a tarefa' value={lostStarDelay} onValueChange={(val) => setLostStarDelay(val)} />

					<Check text='Tarefa vale uma conquista' value={hasAchievement} onValueChange={(val) => setFormHasAchievement(val)} />

					<Selection
						label='Conquista:'
						values={achievementOptions}
						value={achievement}
						onSelect={(item) => {
							setFormAchievement(item.value)
						}}
					/>

					<View style={{ flexDirection: 'row' }}>
						<CompDatePicker
							useState={myUseState}
							label='Data e hora inicial:*'
							type='datetime'
							date={dateToStart}
							setDate={setDateToStart}
							styleProps={{ flex: 0.5, paddingLeft: 0, paddingRight: 1 }}
						/>
						{/* <CompDatePicker
						useState={myUseState}
						label='Hora inicial:*'
						type='time'
						date={hrStart}
						setDate={setFormHrStart}
					/> */}

						<CompDurationPicker
							useState={myUseState}
							label='Tempo para realização:'
							type='duration'
							date={duration}
							setDate={setFormDuration}
							styleProps={{ flex: 0.5, paddingLeft: 0, paddingRight: 0 }}
						/>
					</View>
					<Button label='Salvar' onPress={() => onButtonSavePress()} />
				</ScrollView>
			</View>
		)
	}

	return renderContent()
}
