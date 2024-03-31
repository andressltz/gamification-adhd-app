import React from 'react'
import { View, SafeAreaView } from 'react-native'

import styles from '../../styles'
import { Button, Input } from '../../components'

export function RegisterScreen() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
			<View style={styles.container}>

				<Input label='Nome:' placeholder='Insira seu nome'/>
				<Input label='Email:' placeholder='Insira seu email' type='email-address' />
				<Input label='Telefone:' placeholder='Insira seu telefone' type='phone-pad' />

				<Button label="Cadastrar"/>

			</View>
		</SafeAreaView>
	)
}
