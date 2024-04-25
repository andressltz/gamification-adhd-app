import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

// import CheckBox from '@react-native-community/checkbox'

export function Check(props) {
	const { style = {}, text = '', ...otherProps } = props

	return (
		<View style={styles.container}>
			<View style={styles.checkbox}>{/* <CheckBox {...otherProps} /> */}</View>
			<Text style={styles.text}>{text}</Text>
		</View>
	)
}
