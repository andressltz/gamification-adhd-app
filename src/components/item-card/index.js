import React from 'react'

import { View, Text } from 'react-native'
import styles from './styles'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from '../button'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { COLORS } from '../../assets/colors'

export function ItemCard(props) {
	const { title, status, qtyStars, dateToStart, timeToStart, duration, id } = props

	function getDateToDo(date, time) {
		return moment(date).format('L').concat(' - ').concat(moment(time).format('LT'))
	}

	function getStatusColor() {
		if (status === 'DO_NOT_STARTED') {
			return COLORS.YELLOW
		} else if (status === 'BLOCKED') {
			return COLORS.GREY
		} else if (status === 'DOING') {
			return COLORS.BLUE
		} else if (status === 'PAUSED') {
			return COLORS.BLUE
		} else if (status === 'FINISHED') {
			return COLORS.GREEN_BUTTON
		}
	}

	function getButtonLabel() {
		if (status === 'DO_NOT_STARTED') {
			return 'Iniciar'
		} else if (status === 'BLOCKED') {
			return 'Bloqueada'
		} else if (status === 'DOING') {
			return 'Continuar'
		} else if (status === 'PAUSED') {
			return 'Continuar'
		} else if (status === 'FINISHED') {
			return 'Finalizada'
		}
	}

	return (
		<View style={styles.card}>
			<View style={styles.firstLine}>
				<Icon name='tasks' size={18} color={getStatusColor()} />
				<Text style={styles.title}>{title}</Text>
				<Button
					label={getButtonLabel()}
					buttonStyle={{ backgroundColor: getStatusColor(), height: 30, flex: 1 }}
					textStyle={{ fontSize: 13, fontWeight: '600' }}
				/>
			</View>
			<View style={styles.secondLine}>
				<StarRatingDisplay
					rating={qtyStars}
					starSize={26}
					emptyColor={COLORS.GREY}
					color={COLORS.YELLOW}
					starStyle={{ marginHorizontal: 0 }}
				/>
			</View>
			<View style={styles.thirdLine}>
				<View style={styles.date}>
					<Icon name='calendar' style={styles.dateText} />
					<Text style={styles.dateText}>{getDateToDo(dateToStart, timeToStart)}</Text>
				</View>
				{duration || true ? <Text style={styles.duration}>Tempo da tarefa {moment(duration).format('LT')}</Text> : null}
			</View>
			<View style={styles.separator} />
		</View>
	)
}
