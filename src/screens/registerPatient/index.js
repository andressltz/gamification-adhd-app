import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { Button, Input, Selection, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function RegisterPatientScreen(props) {
	const { navigation, route } = props
	const userLogged = route.params.userLogged

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [name, setFormName] = useState(null)
	const [email, setFormEmail] = useState(userLogged.email)
	const [phone, setFormPhone] = useState(null)
	const [gender, setGender] = useState(null)

	const genderOptions = [
		{ label: 'Não informado', value: '0' },
		{ label: 'Feminino', value: '1' },
		{ label: 'Masculino', value: '2' },
	]

	async function onButtonRegisterPress() {
		setIsLoading(true)
		setHasError(false)
		const response = await api.post('/user/patient/new', {
			name: name,
			phone: phone,
			type: '1',
			gender: gender,
		})

		if (response?.data?.data) {
			navigation.navigate('ProfileScreen', [])
			setHasError(false)
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
			// <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={globalStyles.container}>
			<View style={globalStyles.containerScroll}>
				<ScrollView style={globalStyles.scrollview}>
					{hasError ? <Toast label={errorMessage} /> : null}

					<Input
						label='Nome Completo:*'
						placeholder='Insira o nome completo do paciente'
						onChangeText={setFormName}
						autoCorrect={false}
						value={name}
					/>

					<Input
						label='Email:*'
						placeholder='nome@servidor.com.br'
						type='email-address'
						onChangeText={setFormEmail}
						autoCorrect={false}
						autoCapitalize='none'
						value={email}
						readOnly={true}
					/>

					<Input
						label='Telefone:'
						placeholder='(11) 98765-4321'
						type='phone-pad'
						inputMode='numeric'
						onChangeText={setFormPhone}
						autoCorrect={false}
						autoCapitalize='none'
						value={phone}
					/>

					<Selection
						label='Gênero:'
						values={genderOptions}
						value={gender}
						onSelect={(item) => {
							setGender(item.value)
						}}
					/>

					<Button label='Cadastrar' onPress={() => onButtonRegisterPress()} />
				</ScrollView>
				{/* </KeyboardAvoidingView> */}
			</View>
		)
	}

	return renderContent()
}
