import { StyleSheet } from 'react-native'
import { COLORS } from './assets'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.WHITE,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
	},
	containerScroll: {
		flex: 1,
		backgroundColor: COLORS.WHITE,
	},
	scrollview: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
	},
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.GREEN_PRIM,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerButtonRight: {
		flexDirection: 'row',
	},
})
