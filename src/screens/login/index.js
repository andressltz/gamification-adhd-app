import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from '../../styles'
import { Button, Input, Toast } from '../../components'
import { ApiClient } from '../../services'

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

		if (response.data.data.token) {
			console.log('token salvando', response. data.data.token)
			await AsyncStorage.setItem('@App:token', response.data.data.token)
			await AsyncStorage.setItem('@App:userType', response.data.data.user.type)
			setTokenStack(response.data.data.token)
		} else {
			await AsyncStorage.setItem('@App:token', undefined)
			await AsyncStorage.setItem('@App:userType', undefined)
			setTokenStack(undefined)
			setHasError(true)
			setErrorMessage(response.data.error)
		}
	}

	function onButtonRegisterPress() {
		navigation.navigate('RegisterScreen', [])
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
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
		</SafeAreaView>
	)
}
