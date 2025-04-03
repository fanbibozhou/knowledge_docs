import { defineConfig } from 'vitepress'
import { nav } from './conf/navbar.mts';
import { generateSidebar  }  from './conf/sidebar'
// import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    // lineNumbers: true,
    // theme: 'material-theme-palenight',
    // theme: 'material-theme',
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
      // dark: 'dracula-soft',
      // light: 'github-dark',
    }
  },

  vite: {
    ssr: {
      noExternal: ['vue', 'vitepress']
    }
  },
  lang: 'zh-CN', //语言，可选 en-US
  title: "泛彼泊舟",    //网站标题
  description: "个人知识库",   //网站描述
  base: "/knowledge_docs/",    //根目录
  // logo: '/index.png',   //网站logo
  // srcDir: "docs",   //相对目录，用于存放md文件
  //网站头部设置
  head: [
    ["link", {rel: "icon", href: '/index.png'}],],

  themeConfig: {    //主题配置

    logo: '/index.png' , //网站左上角logo

    //网站底部设置
    footer: {
      //底部信息
      // message: '<a href="https://beian.miit.gov.cn/#/Integrated/index">渝ICP备2023004958号-2</a>',
      //底部版权
      // copyright: " Copyright © 2024 longshao.website All Rights Reserved. ",
    },

    //本地搜索
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config

    //导航栏配置,引入relaConf目录的配置
    nav: nav,

    // 侧边栏配置
    sidebar: {
      '/python/basic/': generateSidebar('docs','python/basic'), // 指定具体目录
      '/python/flask/': generateSidebar('docs','python/flask') // 
    },


    //导航栏中展示带有图标的社交帐户链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    //更新时间
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    //手机端配置返回顶部
    // returnToTop: true,
    //手机端配置返回顶部按钮显示文字
    returnToTopLabel: "返回顶部",
    //手机端配置侧边栏菜单按钮显示文字
    sidebarMenuLabel: "菜单",

    //右侧内容导航栏
    outline: {
      level: [2, 6],
      label:"导航"
    },
    //翻页
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  }
})
