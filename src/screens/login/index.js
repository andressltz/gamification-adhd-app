import PWAInstall from '@khmyznikov/pwa-install/react-legacy'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Input, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function LoginScreen(props) {
	const { navigation, route } = props
	const { setTokenStack, setUserTypeStack } = route.params

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [email, setFormEmail] = useState(null)
	const [pass, setFormPass] = useState(null)

	async function onButtonLoginPress() {
		setIsLoading(true)
		setHasError(false)
		const response = await api.post('/login', {
			email: email,
			password: pass,
		})
		if (response?.data?.data?.token) {
			await AsyncStorage.setItem('@App:token', response.data.data.token)
			await AsyncStorage.setItem('@App:userType', response.data.data.user.type)
			setTokenStack(response.data.data.token)
			setUserTypeStack(response.data.data.user.type)
			setHasError(false)
		} else {
			await AsyncStorage.removeItem('@App:token')
			await AsyncStorage.removeItem('@App:userType')
			setTokenStack(undefined)
			setUserTypeStack(undefined)
			setHasError(true)
			setErrorMessage(response)
		}
		setIsLoading(false)
	}

	function onButtonRegisterPress() {
		navigation.navigate('RegisterScreen', [])
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
			<View style={[globalStyles.container]}>
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
					secureTextEntry={true}
					value={pass}
				/>

				<Button label='Entrar' onPress={() => onButtonLoginPress()} />

				<Toast
					type='info'
					title='Para realizar o cadastro, é necessário um email.'
					label='Se o usuário for um paciente e não possuir email, realize o login com a conta do responsável.'
				/>

				<Button label='Cadastrar' onPress={() => onButtonRegisterPress()} />
				<PWAInstall></PWAInstall>
			</View>
		)
	}

	return renderContent()
}
