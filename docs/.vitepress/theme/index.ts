// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Nav from './Nav.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavPage', Nav)
  }
}