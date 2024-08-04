import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign'
import EntypoIcon from 'react-native-vector-icons/dist/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import styles from './styles'

export function BadgeBoard(props) {
	const { label = '', onSelect = () => {} } = props

	const [selectedIcon, setSelectedIcon] = useState({ family: 'ant', color: 'BLUE', name: 'star', code: 'ant_dstar_dBLUE' })

	const [selectedColor, setSelectedColor] = useState({ name: 'BLUE', color: COLORS.BLUE })

	const colors = [
		{ name: 'BLACK', color: COLORS.BLACK },
		{ name: 'GREY', color: COLORS.GREY },
		{ name: 'GREY_SEC', color: COLORS.GREY_SEC },
		{ name: 'GREY_DARK', color: COLORS.GREY_DARK },
		{ name: 'GREEN_SEC', color: COLORS.GREEN_SEC },
		{ name: 'BLUE', color: COLORS.BLUE },
		{ name: 'YELLOW', color: COLORS.YELLOW },
		{ name: 'RED', color: COLORS.RED },
	]

	const antDesignIcons = [
		{ family: 'ant', code: 'star' },
		{ family: 'ant', code: 'customerservice' },
		{ family: 'ant', code: 'creditcard' },
		{ family: 'ant', code: 'codesquareo' },
		{ family: 'ant', code: 'enviroment' },
		{ family: 'ant', code: 'heart' },
		{ family: 'ant', code: 'instagram' },
		{ family: 'ant', code: 'smile-circle' },
		{ family: 'ant', code: 'play' },
		{ family: 'ant', code: 'addusergroup' },
		{ family: 'ant', code: 'tablet1' },
		{ family: 'ant', code: 'mail' },
		{ family: 'ant', code: 'home' },
		{ family: 'ant', code: 'laptop' },
		{ family: 'ant', code: 'shoppingcart' },
		{ family: 'ant', code: 'videocamera' },
		{ family: 'ant', code: 'phone' },
		{ family: 'ant', code: 'camera' },
		{ family: 'ant', code: 'windows' },
		{ family: 'ant', code: 'chrome' },
		{ family: 'ant', code: 'calendar' },
		{ family: 'ant', code: 'apple1' },
		{ family: 'ant', code: 'android1' },
		{ family: 'ant', code: 'wifi' },
		{ family: 'ant', code: 'sound' },
		{ family: 'ant', code: 'message1' },
		{ family: 'ant', code: 'shake' },
		{ family: 'ant', code: 'dashboard' },
		{ family: 'ant', code: 'facebook-square' },
		{ family: 'ant', code: 'youtube' },
		{ family: 'ent', code: 'aircraft' },
		{ family: 'ent', code: 'awareness-ribbon' },
		{ family: 'ent', code: 'back-in-time' },
		{ family: 'ent', code: 'battery' },
		{ family: 'ent', code: 'beamed-note' },
		{ family: 'ent', code: 'bowl' },
		{ family: 'ent', code: 'cake' },
		{ family: 'ent', code: 'blackboard' },
		{ family: 'ent', code: 'baidu' },
		{ family: 'ent', code: 'chat' },
		{ family: 'ent', code: 'drink' },
		{ family: 'ent', code: 'drop' },
		{ family: 'ent', code: 'graduation-cap' },
		{ family: 'ent', code: 'shield' },
		{ family: 'ent', code: 'ticket' },
		{ family: 'ent', code: 'time-slot' },
		{ family: 'ent', code: 'tree' },
		{ family: 'ent', code: 'trophy' },
		{ family: 'ent', code: 'wallet' },
		{ family: 'faw', code: 'diamond' },
		{ family: 'faw', code: 'whatsapp' },
		{ family: 'faw', code: 'facebook-official' },
		{ family: 'faw', code: 'soccer-ball-o' },
		{ family: 'faw', code: 'graduation-cap' },
		{ family: 'faw', code: 'sun-o' },
		{ family: 'faw', code: 'pagelines' },
		{ family: 'faw', code: 'moon-o' },
		{ family: 'faw', code: 'support' },
		{ family: 'faw', code: 'resistance' },
		{ family: 'faw', code: 'empire' },
		{ family: 'faw', code: 'bell-slash-o' },
		{ family: 'faw', code: 'toggle-on' },
		{ family: 'faw', code: 'bicycle' },
		{ family: 'faw', code: 'bus' },
		{ family: 'faw', code: 'motorcycle' },
		{ family: 'faw', code: 'bed' },
		{ family: 'faw', code: 'train' },
		{ family: 'faw', code: 'television' },
		{ family: 'faw', code: 'free-code-camp' },
		{ family: 'faw', code: 'bath' },
		{ family: 'faw', code: 'snowflake-o' },
	]

	function setIcon(familyName, name, color) {
		setSelectedIcon({ family: familyName, color: color, name: name, code: `${familyName}_d${name}_d${color}` })
		onSelect(selectedIcon)
	}

	function setColor(color) {
		setSelectedColor(color)
		setIcon(selectedIcon.family, selectedIcon.name, color.name)
	}

	function formatData(data, numColumns) {
		if (data.length > 0) {
			const res = data.length % numColumns
			if (res === 0) {
				return data
			}
			const emptyQty = numColumns - res
			for (let id = 0; id < emptyQty; id++) {
				data.push({ id: `blank-${id}`, empty: true })
			}
			return data
		}
		return []
	}

	return (
		<View>
			<Text style={styles.label}>Ícone selecionado:</Text>

			<View style={styles.board}>
				<Text>{selectedIcon.code}</Text>
				<View style={[styles.selectedIcon, { backgroundColor: selectedColor.color }]}>
					{selectedIcon.family === 'ant' ? (
						<AntDesignIcon name={selectedIcon.name} size={35} color={COLORS.WHITE} />
					) : selectedIcon.family === 'ent' ? (
						<EntypoIcon name={selectedIcon.name} size={35} color={COLORS.WHITE} />
					) : (
						<FontAwesomeIcon name={selectedIcon.name} size={35} color={COLORS.WHITE} />
					)}
				</View>
			</View>

			<Text style={styles.label}>Selecione uma cor:</Text>

			<View style={styles.board}>
				<FlatList
					numColumns={4}
					data={formatData(colors, 4)}
					renderItem={({ item }) =>
						item.empty ? (
							<View style={[styles.badgeView, styles.empty]} />
						) : (
							<View style={[styles.badgeView, { backgroundColor: item.color }]}>
								<TouchableOpacity activeOpacity={0.6} onPress={() => setColor(item)}>
									<View style={[styles.colorView]} />
								</TouchableOpacity>
							</View>
						)
					}
				/>
			</View>

			<Text style={styles.label}>{label}</Text>

			<View style={styles.board}>
				<FlatList
					numColumns={4}
					data={formatData(antDesignIcons, 4)}
					renderItem={({ item }) =>
						item.empty ? (
							<View style={[styles.badgeView, styles.empty]} />
						) : (
							<View style={[styles.badgeView, { backgroundColor: COLORS[selectedColor.name] }]}>
								<TouchableOpacity activeOpacity={0.6} onPress={() => setIcon(item.family, item.code, selectedColor.name)}>
									{item.family === 'ant' ? (
										<AntDesignIcon name={item.code} size={35} color={COLORS.WHITE} />
									) : item.family === 'ent' ? (
										<EntypoIcon name={item.code} size={35} color={COLORS.WHITE} />
									) : (
										<FontAwesomeIcon name={item.code} size={35} color={COLORS.WHITE} />
									)}
								</TouchableOpacity>
							</View>
						)
					}
				/>
			</View>
		</View>
	)
}
