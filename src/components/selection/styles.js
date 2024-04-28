import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		paddingTop: 10,
	},
	label: {
		flex: 1,
		position: 'absolute',
		backgroundColor: COLORS.WHITE,
		left: 10,
		top: 4,
		zIndex: 999,
		paddingHorizontal: 6,
		fontSize: 16,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.WHITE,
		height: 50,
		zIndex: 1,
		borderColor: COLORS.GREY,
		borderWidth: 1,
		borderRadius: 8,
	},
	buttonText: {
		flex: 1,
		textAlign: 'left',
		paddingLeft: 10,
	},
	icon: {
		marginRight: 10,
	},
	dropdown: {
		// position: 'absolute',
		backgroundColor: COLORS.WHITE,
		// width: '100%',
		shadowColor: COLORS.BLACK,
		shadowRadius: 4,
		shadowOffset: { height: 4, width: 0 },
		shadowOpacity: 0.5,
		paddingHorizontal: 8,
		borderColor: COLORS.GREY,
		borderWidth: 0.5,
		borderRadius: 8,
		marginLeft: 15,
		marginRight: 15
	},
	overlay: {
		width: '100%',
		height: '100%',
	},
	item: {
		paddingHorizontal: 5,
		paddingVertical: 10,
		borderBottomWidth: 1,
	},
})
