import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { Button, Check, CompDatePicker, Input, Selection, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function EditTaskScreen(props) {
	const { navigation, route } = props
	const idTask = route.params.idTask

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)
	const [task, setTask] = useState({})

	const [title, setFormTitle] = useState(null)
	const [description, setFormDescription] = useState(null)
	const [qtyStars, setFormQtyStars] = useState(null)
	const [lostStarDoNotDo, setLostStarDoNotDo] = useState(null)
	const [lostStarDelay, setLostStarDelay] = useState(null)
	const [dtStart, setFormDtStart] = useState(new Date())
	const [hrStart, setFormHrStart] = useState(new Date())
	const [duration, setFormDuration] = useState(new Date())
	const [hasAchievement, setFormHasAchievement] = useState(null)
	const [achievement, setFormAchievement] = useState(null)

	const qtyStarOptions = [
		{ label: '1 estrela', value: '1' },
		{ label: '2 estrelas', value: '2' },
		{ label: '3 estrelas', value: '3' },
		{ label: '4 estrelas', value: '4' },
		{ label: '5 estrelas', value: '5' },
	]

	const achievementOptions = [
		{ label: 'Mock A', value: 'A' },
		{ label: 'Mock B', value: 'B' },
		{ label: 'Mock C', value: 'C' },
	]

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			setHasError(false)

			await api.get(`/task/${idTask}`).then((response) => {
				if (response?.data?.data) {
					setTask(response.data.data)
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
		const response = await api.post('/task', {
			status: 1,
			title: title,
			description: description,
			qtyStars: qtyStars,
			lostStarDoNotDo: lostStarDoNotDo,
			lostStarDelay: lostStarDelay,
			dateToStart: dtStart,
			timeToStart: hrStart,
			// timeToDo: duration,
			hasAchievement: hasAchievement,
			achievement: achievement,
			patient: { id: 1 },
			owner: { id: 2 },
		})
		if (response?.data?.data) {
			navigation.navigate('TasksScreen', [])
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
			<View>
				{hasError ? <Toast label={errorMessage} /> : null}

				<View style={globalStyles.containerScroll}>
					<ScrollView style={globalStyles.scrollview}>
						{hasError ? <Toast label={errorMessage} /> : null}

						<Input label='Título da tarefa:*' placeholder='Ex: Arrumar guarda roupa' onChangeText={setFormTitle} value={task.title} />

						<Input
							label='Orientações da tarefa:*'
							placeholder='Ex: Dobrar todas as roupas'
							onChangeText={setFormDescription}
							value={task.description}
						/>

						<Selection
							label='Quantidade de estrelas:'
							values={qtyStarOptions}
							value={task.qtyStars}
							onSelect={(item) => {
								setFormQtyStars(item.value)
							}}
						/>

						<Check
							text='Perde estrelas se não realizar a tarefa'
							value={task.lostStarDoNotDo}
							onValueChange={(val) => setLostStarDoNotDo(val)}
						/>

						<Check
							text='Perde estrelas se atrasar a tarefa'
							value={task.lostStarDelay}
							onValueChange={(val) => setLostStarDelay(val)}
						/>

						<Check text='Tarefa vale uma conquista' value={task.hasAchievement} onValueChange={(val) => setFormHasAchievement(val)} />

						<Selection
							label='Conquista:'
							values={achievementOptions}
							value={task.achievement}
							onSelect={(item) => {
								setFormAchievement(item.value)
							}}
						/>

						<View style={{ flexDirection: 'row' }}>
							<CompDatePicker
								useState={myUseState}
								label='Data e hora inicial:*'
								type='datetime'
								date={task.dtStart}
								setDate={setFormDtStart}
								styleProps={{ flex: 0.5, paddingLeft: 0, paddingRight: 0 }}
							/>
							{/* <CompDatePicker
						useState={myUseState}
						label='Hora inicial:*'
						type='time'
						date={hrStart}
						setDate={setFormHrStart}
					/> */}

							<CompDatePicker
								useState={myUseState}
								label='Tempo para realização:'
								type='time'
								date={task.duration}
								setDate={setFormDuration}
								styleProps={{ flex: 0.5, paddingLeft: 0, paddingRight: 0 }}
							/>
						</View>
						<Button label='Salvar' onPress={() => onButtonSavePress()} />
					</ScrollView>
				</View>
			</View>
		)
	}

	return renderContent()
}
