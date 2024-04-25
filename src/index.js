import ReactDOM from 'react-dom/client'
import { AppRegistry } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
// Use the prebuilt version of RNVI located in the dist folder

// Generate the required CSS
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
import App from './App'

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', {
	rootTag: document.getElementById('root'),
})

const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: FontAwesome;
  }`

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
