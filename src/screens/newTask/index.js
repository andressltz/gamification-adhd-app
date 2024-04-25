import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native'

import styles from '../../styles'
import { ApiClient } from '../../services'
import { Button, Input, Toast, Selection, Check, CompDatePicker } from '../../components'

const api = ApiClient()

export function NewTaskScreen(props) {
	const { navigation } = props

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

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

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.containerScroll}>
				<ScrollView style={styles.scrollview}>
					{hasError ? <Toast label={errorMessage} /> : null}

					<Input label='Título da tarefa:' placeholder='Ex: Arrumar guarda roupa' onChangeText={setFormTitle} value={title} />

					<Input
						label='Orientações da tarefa:'
						placeholder='Ex: Dobrar todas as roupas'
						onChangeText={setFormDescription}
						value={description}
					/>

					<Selection
						label='Quantidade de estrelas:'
						data={qtyStarOptions}
						value={qtyStars}
						onChange={(item) => {
							setFormQtyStars(item.value)
						}}
					/>

					<Check
						text='Perde estrelas se não realizar a tarefa'
						value={lostStarDoNotDo}
						onValueChange={(val) => setLostStarDoNotDo(val)}
					/>

					<Check text='Perde estrelas se atrasar a tarefa' value={lostStarDelay} onValueChange={(val) => setLostStarDelay(val)} />

					<Check text='Tarefa vale uma conquista' value={hasAchievement} onValueChange={(val) => setFormHasAchievement(val)} />

					<Selection
						label='Conquista:'
						data={achievementOptions}
						value={achievement}
						onChange={(item) => {
							setFormAchievement(item.value)
						}}
					/>

					<View style={{ flexDirection: 'row' }}>
						<CompDatePicker
							useState={myUseState}
							label='Data inicial:'
							type='date'
							dateTimeValue={dtStart}
							setDateTimeValue={setFormDtStart}
						/>
						<CompDatePicker
							useState={myUseState}
							label='Hora inicial:'
							type='time'
							dateTimeValue={hrStart}
							setDateTimeValue={setFormHrStart}
						/>
						<CompDatePicker
							useState={myUseState}
							label='Tempo para realização:'
							type='time'
							dateTimeValue={duration}
							setDateTimeValue={setFormDuration}
						/>
					</View>
					<Button label='Salvar' onPress={() => onButtonSavePress()} />
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
