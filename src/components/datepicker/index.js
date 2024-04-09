import React from 'react'

import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/pt-br'
import styles from './styles'

export function CompDatePicker({ useState, label, type, dateTimeValue, setDateTimeValue }) {
	const [show, setShow] = useState(false)

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate
		setShow(false)
		setDateTimeValue(currentDate)
	}

	const showDatepicker = () => {
		setShow(true)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={showDatepicker}>
				<Text style={styles.label}>{label}</Text>
				{show && <DateTimePicker mode={type} is24Hour={true} value={dateTimeValue} onChange={onChangeDate} />}

				<TextInput
					editable={false}
					style={styles.input}
					value={type === 'date' ? moment(dateTimeValue).format('L') : moment(dateTimeValue).format('LT')}
				/>
			</TouchableOpacity>
		</View>
	)
}

CompDatePicker.propTypes = {
	useState: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}
