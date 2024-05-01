import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { Button, Input, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function NewAchievementScreen(props) {
	const { navigation, route } = props
	const { patientId, patientName } = route.params

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [title, setFormTitle] = useState(null)

	async function onButtonSavePress() {
		setIsLoading(true)
		setHasError(false)

		const response = await api.post('/achievement', {
			status: 0,
			title: title,
			patient: { id: patientId },
			ownerId: 1,
		})
		if (response?.data?.data) {
			setHasError(false)
			navigation.navigate('AchievementsScreen', { patientId: patientId, patientName: patientName })
		} else {
			setHasError(true)
			setErrorMessage(response)
		}
		setIsLoading(false)
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

					<Input
						label='Título da conquista:*'
						placeholder='Ex: Guarda roupa arrumado'
						onChangeText={setFormTitle}
						value={title}
					/>

					<Button label='Salvar' onPress={() => onButtonSavePress()} />
				</ScrollView>
			</View>
		)
	}

	return renderContent()
}