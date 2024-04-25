import React from 'react'

import { View, Text } from 'react-native'
// import { Dropdown } from 'react-native-element-dropdown'
import styles from './styles'

export function Selection(props) {
	const { style = {}, label = '', data = [], ...otherProps } = props

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			{/* <Dropdown
				data={data}
				labelField='label'
				maxHeight={300}
				style={[styles.dropdown]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				valueField='value'
				placeholder={'Selecione...'}
				iconStyle={styles.iconStyle}
				{...otherProps}
			/> */}
		</View>
	)
}
