import React from 'react'
import { Text, View } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import styles from './styles'

export function LevelStarStatus(props) {
	const { currentLevel = 1, currentStars = 0, maxLevel = 30, maxStars = 1500 } = props

	function pad(width, string, padding) {
		return width <= string.length ? string : pad(width, padding + string, padding)
	}

	function getProgress(current, max) {
		return current / max
	}

	return (
		<View style={styles.container}>
			<View style={styles.firstRow}>
				<View style={styles.firstColumn}>
					<FontAwesomeIcon name='trophy' size={36} color={COLORS.ORANGE} />
				</View>
				<View style={styles.secondColumn}>
					<Text style={styles.achievement}>
						NÍVEL: {pad(2, currentLevel.toString(), '0')}/{pad(2, maxLevel.toString(), '0')}
					</Text>
					<ProgressBar
						progress={getProgress(currentLevel, maxLevel)}
						width={null}
						height={18}
						color={COLORS.ORANGE}
						borderWidth={2}
						borderColor={COLORS.GREY}
						borderRadius={10}
					/>
				</View>
			</View>

			<View style={styles.secondRow}>
				<View style={styles.firstColumn}>
					<FontAwesomeIcon name='star' size={36} color={COLORS.YELLOW} />
				</View>
				<View style={styles.secondColumn}>
					<Text style={styles.achievement}>
						ESTRELAS: {pad(2, currentStars.toString(), '0')}/{pad(2, maxStars.toString(), '0')}
					</Text>
					<ProgressBar
						progress={getProgress(currentStars, maxStars)}
						width={null}
						height={18}
						color={COLORS.YELLOW}
						borderWidth={2}
						borderColor={COLORS.GREY}
						borderRadius={10}
					/>
				</View>
			</View>
		</View>
	)
}
