import DefaultTheme from 'vitepress/theme'
import Nav from './Nav.vue'
import { navGroups } from './navData'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavPage', Nav)
    // 注入全局数据（可选）
    app.provide('navGroups', navGroups)
  }
}