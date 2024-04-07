import React from 'react'
import { View, SafeAreaView } from 'react-native'

import styles from '../../styles'
import { Button, Input } from '../../components'

export function LoginScreen(props) {
	const {navigation} = props

	function onButtonRegisterPress() {
		navigation.navigate('RegisterScreen', [])
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
			<View style={styles.container}>

				<Input label='Email:' placeholder='Email'/>
				<Input label='Senha:' placeholder='Senha'/>

				<Button label="Entrar"/>
				<Button label="Cadastrar" onPress={() => onButtonRegisterPress()}/>

			</View>
		</SafeAreaView>
	)
}
