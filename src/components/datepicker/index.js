import dayjs from 'dayjs'
import locale from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { pt, registerTranslation, TimePickerModal } from 'react-native-paper-dates'
import DateTimePicker from 'react-native-ui-datepicker'
import styles from './styles'

export function CompDatePicker({ useState, label, type = 'date', date, setDate, styleProps = {} }) {
	registerTranslation('pt', pt)
	dayjs.extend(relativeTime)
	dayjs.locale(locale)

	const ComponentButton = useRef()
	const [show, setShow] = useState(false)
	const [componentTop, setComponentTop] = useState(0)

	const onDismiss = React.useCallback(() => {
		setShow(false)
	}, [setShow])

	const onConfirm = React.useCallback(
		({ hours, minutes }) => {
			setShow(false)
			// console.log({ hours, minutes })
		},
		[setShow],
	)

	const openModal = () => {
		// ComponentButton.current.measure((_fx, _fy, _w, h, _px, py) => {
		// 	setComponentTop(py + h)
		// })
		setShow(true)
	}

	const onChangeDate = (selectedDate) => {
		setDate(selectedDate)
		setShow(false)
	}

	const showDatepicker = () => {
		show ? setShow(false) : openModal()
	}

	function renderDatePicker() {
		return (
			<TouchableOpacity ref={ComponentButton} onPress={showDatepicker}>
				<TextInput
					editable={false}
					style={styles.input}
					value={
						type === 'date'
							? dayjs(date).locale(locale).format('L')
							: type === 'time'
							? dayjs(date).locale(locale).format('LT')
							: dayjs(date).locale(locale).format('DD/MM/YYYY HH:mm')
					}
				/>
				<Modal visible={show} transparent animationType='none'>
					<TouchableOpacity style={styles.overlay} onPress={() => setShow(false)}>
						<View style={[styles.viewModal]}>
							{/* { top: componentTop } */}
							<DateTimePicker
								mode='single'
								timePicker={type === 'time' || type === 'datetime'}
								date={date}
								locale='pt'
								onChange={(params) => onChangeDate(params.date)}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
			</TouchableOpacity>
		)
	}

	function renderTimePicker() {
		return (
			<View>
				<TouchableOpacity onPress={() => setShow(true)}>
					<TextInput
						editable={false}
						style={styles.input}
						value={
							type === 'date'
								? dayjs(date).locale(locale).format('L')
								: type === 'time'
								? dayjs(date).locale(locale).format('LT')
								: dayjs(date).locale(locale).format('DD/MM/YYYY HH:mm')
						}
					/>
					<TimePickerModal
						// keyboardIcon={undefined}
						// clockIcon={undefined}
						use24HourClock={true}
						visible={show}
						onDismiss={onDismiss}
						onConfirm={onConfirm}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={[styles.container, styleProps]}>
			<Text style={styles.label}>{label}</Text>
			{type === 'time' ? renderTimePicker() : renderDatePicker()}
		</View>
	)
}

CompDatePicker.propTypes = {
	useState: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}
