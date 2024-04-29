import ReactDOM from 'react-dom/client'
import { AppRegistry } from 'react-native'
import iconEvilIcons from 'react-native-vector-icons/Fonts/EvilIcons.ttf'
// Use the prebuilt version of RNVI located in the dist folder

// Generate the required CSS
import iconFontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import iconIonicons from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import iconMaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'
import iconMaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import { pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt)
import App from './App'

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', {
	rootTag: document.getElementById('root'),
})

const iconFontStyles = `
@font-face {
    src: url(${iconFontAwesome});
    font-family: FontAwesome;
  }
	@font-face {
    src: url(${iconEvilIcons});
    font-family: EvilIcons;
  }
	@font-face {
    src: url(${iconIonicons});
    font-family: Ionicons;
  }
	@font-face {
    src: url(${iconMaterialIcons});
    font-family: MaterialIcons;
  }
	@font-face {
    src: url(${iconMaterialCommunityIcons});
    font-family: MaterialCommunityIcons;
  }
	`

// Create a stylesheet
const style = document.createElement('style')
style.type = 'text/css'

// Append the iconFontStyles to the stylesheet
if (style.styleSheet) {
	style.styleSheet.cssText = iconFontStyles
} else {
	style.appendChild(document.createTextNode(iconFontStyles))
}

// Inject the stylesheet into the document head
document.head.appendChild(style)
