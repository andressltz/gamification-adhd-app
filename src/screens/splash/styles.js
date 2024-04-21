import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/colors'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.GREEN_PRIM,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.GREEN_PRIM,
	},
	label: {
		fontSize: 30,
		fontWeight: 'bold',
		color: COLORS.WHITE,
	},
})
