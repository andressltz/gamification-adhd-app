import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button, Check, CompDatePicker, Input, Selection, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'
import style from './styles'

const api = ApiClient()

export function NewPatientScreen(props) {
	const { navigation } = props

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [email, setEmail] = useState(null)
	const [telephone, setTelephone] = useState(null)

	async function onButtonSavePress() {
		const response = await api.post('/user/patient', {
			status: 1,
			email: email,
			phone: telephone,
		})
		if (response?.data?.data) {
			navigation.navigate('ProfileScreen', [])
		} else {
			setHasError(true)
			setErrorMessage(response)
		}
	}

	return (
		<View style={globalStyles.container}>
			<ScrollView>
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

				<Input
					label='Informe o telefone do paciente:'
					placeholder='(11) 98765-4321'
					onChangeText={setTelephone}
					value={telephone}
					type='phone-pad'
					autoCorrect={false}
					autoCapitalize='none'
				/>

				<Button label='Vincular paciente' onPress={() => onButtonSavePress()} />
			</ScrollView>
		</View>
	)
}
