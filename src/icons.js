/* eslint-disable camelcase */
// import Entypo_ttf from 'react-native-vector-icons/Fonts/Entypo.ttf'
// import FontAwesome_ttf from 'react-native-vector-icons/Fonts/FontAwesome.ttf'

// const IconsCSS = `
// @font-face {
//   src: url(${FontAwesome_ttf});
//   font-family: FontAwesome;
// }
// @font-face {
//   src: url(${Entypo_ttf});
//   font-family: Entypo;
// }
// `

const style = document.createElement('style')
style.type = 'text/css'
// if (style.styleSheet) style.styleSheet.cssText = IconsCSS
// else style.appendChild(document.createTextNode(IconsCSS))

document.head.appendChild(style)
