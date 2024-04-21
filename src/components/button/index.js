import React from 'react'

import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../assets'

export function Button(props) {
	const { buttonStyle = {}, textStyle = {}, label, hasIcon = false, icon, ...otherProps } = props

	return (
		<TouchableOpacity activeOpacity={0.6} style={[styles.mainButton, buttonStyle]} {...otherProps}>
			{hasIcon ? <Icon name={icon} size={14} color={COLORS.WHITE} style={styles.icon} /> : null}
			<Text style={[styles.buttonText, textStyle]}>{label}</Text>
		</TouchableOpacity>
	)
}
