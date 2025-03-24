// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Nav from './Nav.vue'
import './custom.css' // 确保样式文件导入

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavPage', Nav) // 确保组件已注册
  }
}