import React, { useState } from 'react'
import { View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'


import styles from '../../styles'
import { Button, Input, Toast, Selection } from '../../components'
import { api } from '../../services'

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
    { label: 'Paciente', value: '1' },
    { label: 'Responsável', value: '2' },
    { label: 'Profissional', value: '3' },
  ]

	async function register() {
		const response = await api.post('/user', {
			name: name,
			email: email,
			phone: phone,
			password: pass,
			type: userType,
		})

		if (response.data.data) {
			navigation.navigate('LoginScreen', [])
		} else {
			setHasError(true)
			setErrorMessage(response.data.error)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
				<ScrollView>
				{hasError ? <Toast label={errorMessage} /> : null}

				<Input label='Nome:' placeholder='Insira seu nome' onChangeText={setFormName} autoCorrect={false} value={name} />
				<Input
					label='Email:'
					placeholder='Insira seu email'
					type='email-address'
					onChangeText={setFormEmail}
					autoCorrect={false}
					autoCapitalize='none'
					value={email}
				/>
				<Input
					label='Telefone:'
					placeholder='Insira seu telefone'
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

				<Selection label='Tipo de usuário:'
				data={userTypeOptions}
				value = {userType}
				onChange={(item) => {
					setUserType(item.value)
				}}
				/>

				<Button label='Cadastrar' onPress={() => register()} />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
