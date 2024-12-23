import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { Button, Input, InputMask, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'
import style from './styles'

const api = ApiClient()

export function NewPatientScreen(props) {
	const { navigation, route } = props
	const userLogged = route.params.user

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [email, setEmail] = useState(null)
	const [telephone, setTelephone] = useState(null)

	async function onButtonSavePress() {
		setIsLoading(true)
		setHasError(false)
		const response = await api.post('/user/patient', {
			status: 1,
			email: email,
			phone: telephone,
		})
		if (response?.data?.data) {
			navigation.navigate('ProfileScreen', [])
			setHasError(false)
		} else {
			setHasError(true)
			setErrorMessage(response)
			setIsLoading(false)
		}
	}

	async function onButtonNewPatientPress() {
		navigation.navigate('RegisterPatientScreen', { userLogged: userLogged })
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

					<Text style={style.title}>Busque pelo email ou pelo telefone</Text>

					<Input
						label='Informe o email do paciente:'
						placeholder='nome@servidor.com.br'
						onChangeText={setEmail}
						value={email}
						type='email-address'
						autoCorrect={false}
						autoCapitalize='none'
					/>

					{/* <InputMask
						label='Informe o telefone do paciente:'
						placeholder='(11) 98765-4321'
						type='phone-pad'
						inputMode='numeric'
						onChangeText={setTelephone}
						autoCorrect={false}
						autoCapitalize='none'
						value={telephone}
						mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
					/> */}

					<Button label='Vincular paciente' onPress={() => onButtonSavePress()} />

					<Toast type='info' label='Se o paciente não tiver email, cadastre um novo paciente utilizando sua conta.' />

					<Button label='Cadastrar Novo Paciente' onPress={() => onButtonNewPatientPress()} />
				</ScrollView>
			</View>
		)
	}

	return renderContent()
}
