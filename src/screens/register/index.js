import React, { useState } from 'react'
import { View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'

import styles from '../../styles'
import { Button, Input, Toast, Selection } from '../../components'
import { ApiClient } from '../../services'

const api = ApiClient()

export function RegisterScreen(props) {
	const { navigation } = props

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [name, setFormName] = useState(null)
	const [email, setFormEmail] = useState(null)
	const [phone, setFormPhone] = useState(null)
	const [pass, setFormPass] = useState(null)
	const [userType, setUserType] = useState(null)

	const userTypeOptions = [
		{ label: 'Responsável', value: '0' },
		{ label: 'Paciente', value: '1' },
		{ label: 'Profissional', value: '2' },
	]

	async function onButtonRegisterPress() {
		const response = await api.post('/user', {
			name: name,
			email: email,
			phone: phone,
			password: pass,
			type: userType,
		})

		if (response?.data?.data) {
			navigation.navigate('LoginScreen', [])
		} else {
			setHasError(true)
			setErrorMessage(response)
		}
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
				<ScrollView>
					{hasError ? <Toast label={errorMessage} /> : null}

					<Input label='Nome:' placeholder='Insira seu nome' onChangeText={setFormName} autoCorrect={false} value={name} />
					<Input
						label='Email:'
						placeholder='nome@servidor.com.br'
						type='email-address'
						onChangeText={setFormEmail}
						autoCorrect={false}
						autoCapitalize='none'
						value={email}
					/>
					<Input
						label='Telefone:'
						placeholder='(11) 98765-4321'
						type='phone-pad'
						onChangeText={setFormPhone}
						autoCorrect={false}
						autoCapitalize='none'
						value={phone}
					/>

					<Input
						label='Senha:'
						placeholder='Digite uma senha'
						onChangeText={setFormPass}
						autoCorrect={false}
						autoCapitalize='none'
						secureTextEntry
						value={pass}
					/>

					<Selection
						label='Tipo de usuário:'
						data={userTypeOptions}
						value={userType}
						onChange={(item) => {
							setUserType(item.value)
						}}
					/>

					<Button label='Cadastrar' onPress={() => onButtonRegisterPress()} />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
