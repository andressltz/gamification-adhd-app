import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		paddingTop: 10,
		padding: 5,
		flexWrap: 'nowrap',
	},
	label: {
		fontSize: 16,
		flexWrap: 'wrap',
		// flex: 1,
		backgroundColor: COLORS.WHITE,
	},
	input: {
		color: COLORS.GREY,
		borderRadius: 10,
		borderColor: COLORS.GREY,
		borderWidth: 1,
		marginTop: 2,
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: COLORS.WHITE,
		paddingVertical: 10,
	},
	overlay: {
		width: '100%',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewModal: {
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
		marginRight: 15,
	},
})
