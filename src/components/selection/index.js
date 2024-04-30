import React, { useRef, useState } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import styles from './styles'

export function Selection(props) {
	const { style = {}, label = '', values = [], onSelect = () => {}, value = undefined } = props

	const DropdownButton = useRef()
	const [visible, setVisible] = useState(false)
	const [selected, setSelected] = useState(getElementByValue(value))
	const [dropdownTop, setDropdownTop] = useState(0)

	function getElementByValue(value) {
		if (value) {
			for (let i = 0; i < values.length; i++) {
				const element = values[i];
				if (element.value === value) {
					return element
				}
			}
		}
		return {}
	}

	const toggleDropdown = () => {
		visible ? setVisible(false) : openDropdown()
	}

	const openDropdown = () => {
		DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownTop(py + h)
		})
		setVisible(true)
	}

	const onItemPress = (item) => {
		setSelected(item)
		onSelect(item)
		setVisible(false)
	}

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
			<Text>{item.label}</Text>
		</TouchableOpacity>
	)

	const renderDropdown = () => {
		return (
			<Modal visible={visible} transparent animationType='none'>
				<TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
					<View style={[styles.dropdown, { top: dropdownTop }]}>
						<FlatList data={values} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
					</View>
				</TouchableOpacity>
			</Modal>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity ref={DropdownButton} style={styles.button} onPress={toggleDropdown}>
				{renderDropdown()}
				<Text style={styles.buttonText}>{(selected && selected.label) || label}</Text>
				<FontAwesomeIcon name='chevron-down' style={styles.icon} />
			</TouchableOpacity>
		</View>
	)
}
