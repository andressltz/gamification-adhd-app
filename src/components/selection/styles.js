import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		paddingTop: 16,
	},
	label: {
		flex: 1,
		position: 'absolute',
		backgroundColor: 'white',
		left: 10,
		top: 4,
		zIndex: 999,
		paddingHorizontal: 6,
		fontSize: 16,
	},
	dropdown: {
		height: 50,
		flex: 1,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
})
