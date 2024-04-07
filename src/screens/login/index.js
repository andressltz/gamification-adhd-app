import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'

import styles from '../../styles'
import { Button, Input, Toast } from '../../components'
import { api } from '../../services'

export function LoginScreen(props) {
	const { navigation } = props

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [email, setFormEmail] = useState(null)
	const [pass, setFormPass] = useState(null)

	async function onButtonLoginPress() {
		const response = await api.post('/login', {
			email: email,
			password: pass,
		})

		if (response.data.data) {
			navigation.navigate('ProfileScreen', [])
		} else {
			setHasError(true)
			setErrorMessage(response.data.error)
		}
	}

	function onButtonRegisterPress() {
		navigation.navigate('RegisterScreen', [])
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
