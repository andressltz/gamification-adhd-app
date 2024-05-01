import React from 'react'
import { Text, View } from 'react-native'
import { COLORS } from '../../assets/colors'
import { Button } from '../button'
import styles from './styles'

export function UserCard(props) {
	const { name, level, qtyStars, id, image, onPressTask = () => {}, onPressAchievement = () => {}, ...otherProps } = props

	return (
		<View style={styles.card}>
			<View style={styles.firstRow}>
				<View style={styles.firstColumn}>
					<Text style={styles.name}>{name}</Text>
				</View>
				<View style={styles.secondColumn}>
					<Text>Nível Mock</Text>
				</View>
			</View>
			<View style={styles.secondRow}>
				<Button
					label='Tarefas'
					buttonStyle={{ backgroundColor: COLORS.BLUE, height: 30, flex: 0.3, marginRight: 5 }}
					textStyle={{ fontSize: 13, fontWeight: '600' }}
					hasIcon={true}
					icon='th-list'
					onPress={onPressTask}
					{...otherProps}
				/>
				<Button
					label='Conquistas'
					buttonStyle={{ backgroundColor: COLORS.YELLOW, height: 30, flex: 0.3 }}
					textStyle={{ fontSize: 13, fontWeight: '600' }}
					hasIcon={true}
					icon='child'
					onPress={onPressAchievement}
					{...otherProps}
				/>
				{/* <Button
					label='Editar'
					buttonStyle={{ backgroundColor: COLORS.GREY_DARK, height: 30, flex: 0.25, marginRight: 5 }}
					textStyle={{ fontSize: 13, fontWeight: '600' }}
					hasIcon={true}
					icon='child'
				/> */}
				{/* <Button
					label='Relatórios'
					buttonStyle={{ backgroundColor: COLORS.GREEN_PRIM, height: 30, flex: 0.25 }}
					textStyle={{ fontSize: 13, fontWeight: '600' }}
					hasIcon={true}
					icon='child'
				/> */}
			</View>
			<View style={styles.separator} />
		</View>
	)
}
