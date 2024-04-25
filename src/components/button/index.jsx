import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import styles from './styles'

export function Button(props) {
	const { buttonStyle = {}, textStyle = {}, label, hasIcon = false, icon, ...otherProps } = props

	return (
		<TouchableOpacity activeOpacity={0.6} style={[styles.mainButton, buttonStyle]} {...otherProps}>
			{hasIcon ? <FontAwesomeIcon name={icon} size={14} color={COLORS.WHITE} style={styles.icon} /> : null}
			<Text style={[styles.buttonText, textStyle]}>{label}</Text>
		</TouchableOpacity>
	)
}
