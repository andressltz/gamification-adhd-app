import React from 'react'
import { Image, Text, View } from 'react-native'
import { COLORS } from '../../assets/colors'
import { LevelStarStatus } from '../../components'
import { Button } from '../button'
import styles from './styles'

export function UserCard(props) {
	const {
		name,
		level,
		qtyStars,
		maxLevel,
		maxStars,
		id,
		image,
		profile,
		gender = undefined,
		onPressTask = () => {},
		onPressAchievement = () => {},
		onPressLogin = () => {},
		...otherProps
	} = props

	return (
		<View style={styles.card}>
			<View style={styles.firstRow}>
				<View style={styles.firstColumn}>
					<View style={{ height: 65 }}>
						{gender && gender === 'FEMALE' ? (
							<Image
								resizeMode='contain'
								source={{ uri: `https://avatar.iran.liara.run/public/girl?username=${name}` }}
								style={{ flex: 1 }}
							/>
						) : (
							<Image
								resizeMode='contain'
								source={{ uri: `https://avatar.iran.liara.run/public/boy?username=${name}` }}
								style={{ flex: 1 }}
							/>
						)}
					</View>
				</View>
				<View style={styles.secondColumn}>
					<Text style={styles.name}>{name}</Text>
				</View>
				<View style={styles.thirdColumn}>
					<LevelStarStatus currentLevel={level} currentStars={qtyStars} maxLevel={maxLevel} maxStars={maxStars} />
				</View>
			</View>
			<View style={styles.secondRow}>
				{/* {profile ? (
					<Button
						label='Login'
						buttonStyle={{ backgroundColor: COLORS.GREEN_BUTTON, height: 30, flex: 0.3, marginRight: 5 }}
						textStyle={{ fontSize: 13, fontWeight: '600' }}
						hasIcon={true}
						icon='sign-out'
						onPress={onPressLogin}
						{...otherProps}
					/>
				) : null} */}

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
