// import { Dropdown } from 'react-native-element-dropdown'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export function Selection(props) {
	const { style = {}, label = '', data = [], ...otherProps } = props
	const [selectedLanguage, setSelectedLanguage] = useState()

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			{/* <Picker selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
				<Picker.Item label='Java' value='java' />
				<Picker.Item label='JavaScript' value='js' />
			</Picker> */}
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
