import ReactDOM from 'react-dom/client'
import { AppRegistry } from 'react-native'
import { pt, registerTranslation } from 'react-native-paper-dates'
// Use the prebuilt version of RNVI located in the dist folder
import iconAntDesign from 'react-native-vector-icons/Fonts/AntDesign.ttf'
import iconEntypo from 'react-native-vector-icons/Fonts/Entypo.ttf'
import iconEvilIcons from 'react-native-vector-icons/Fonts/EvilIcons.ttf'
import iconFontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import iconIonicons from 'react-native-vector-icons/Fonts/Ionicons.ttf'
import iconMaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import iconMaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'
import App from './App'

registerTranslation('pt', pt)

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
	@font-face {
    src: url(${iconAntDesign});
    font-family: AntDesign;
  }
	@font-face {
    src: url(${iconEntypo});
    font-family: Entypo;
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
