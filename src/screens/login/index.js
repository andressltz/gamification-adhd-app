import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Input, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function LoginScreen(props) {
	const { navigation, route } = props
	const { setTokenStack } = route.params

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [email, setFormEmail] = useState(null)
	const [pass, setFormPass] = useState(null)

	async function onButtonLoginPress() {
		const response = await api.post('/login', {
			email: email,
			password: pass,
		})
		if (response?.data?.data?.token) {
			await AsyncStorage.setItem('@App:token', response.data.data.token)
			await AsyncStorage.setItem('@App:userType', response.data.data.user.type)
			setTokenStack(response.data.data.token)
			setHasError(false)
		} else {
			await AsyncStorage.removeItem('@App:token')
			await AsyncStorage.removeItem('@App:userType')
			setTokenStack(undefined)
			setHasError(true)
			setErrorMessage(response)
		}
	}

	function onButtonRegisterPress() {
		navigation.navigate('RegisterScreen', [])
	}

	return (
		<View style={globalStyles.container}>
			{hasError ? <Toast label={errorMessage} /> : null}

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
				label='Senha:'
				placeholder='Digite sua senha'
				onChangeText={setFormPass}
				autoCorrect={false}
				autoCapitalize='none'
				secureTextEntry
				value={pass}
			/>

			<Button label='Entrar' onPress={() => onButtonLoginPress()} />
			<Button label='Cadastrar' onPress={() => onButtonRegisterPress()} />
		</View>
	)
}
