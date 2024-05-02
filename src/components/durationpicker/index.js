import dayjs from 'dayjs'
import locale from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { pt, registerTranslation, TimePickerModal } from 'react-native-paper-dates'
import styles from './styles'

export function CompDurationPicker({ useState, label, date, setDate, styleProps = {} }) {
	registerTranslation('pt', pt)
	dayjs.extend(relativeTime)
	dayjs.locale(locale)

	const [show, setShow] = useState(false)
	const [dateToShow, setDateToShow] = useState('')

	const onDismiss = React.useCallback(() => {
		setShow(false)
	}, [setShow])

	const onConfirm = React.useCallback(
		({ hours, minutes }) => {
			const min = hours * 60
			setDate(min + minutes)
			setDateToShow(`${hours}:${minutes}`)
			setShow(false)
		},
		[setShow],
	)

	return (
		<View style={[styles.container, styleProps]}>
			<Text style={styles.label}>{label}</Text>
			<View>
				<TouchableOpacity onPress={() => setShow(true)}>
					<TextInput editable={false} style={styles.input} value={dateToShow} />
					<TimePickerModal use24HourClock={true} visible={show} onDismiss={onDismiss} onConfirm={onConfirm} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

CompDurationPicker.propTypes = {
	useState: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}
