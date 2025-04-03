import { defineConfig } from 'vitepress'
import { nav } from './conf/navbar.mts';
import { generateSidebar  }  from './conf/sidebar.js'
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
      '/Metering/grouping/': generateSidebar('docs','Metering/grouping'), // 计算机组成原理
      '/Metering/os/': generateSidebar('docs','Metering/os'), // 操作系统
      '/Metering/network/': generateSidebar('docs','Metering/network'), // 计算机网络
      '/Metering/database/': generateSidebar('docs','Metering/database'),  // 数据库
      '/Metering/method/': generateSidebar('docs','Metering/method'), // 数据结构与算法
      '/Metering/design/': generateSidebar('docs','Metering/design'), // 设计模式
      '/Test/basic/': generateSidebar('docs','Test/basic'), // 测试方法与技术
      '/Test/auto/pytest/': generateSidebar('docs','Test/auto/pytest'),   // pytest
      '/Test/auto/interface/': generateSidebar('docs','Test/auto/interface'), // 接口测试及自动化
      '/Test/auto/web/': generateSidebar('docs','Test/auto/web'), // web自动化
      '/Test/auto/app/': generateSidebar('docs','Test/auto/app'), // app自动化
      '/Test/performance/': generateSidebar('docs','Test/performance'), // 性能测试
      '/python/basic/': generateSidebar('docs','python/basic'), // 指定具体目录
      '/python/flask/': generateSidebar('docs','python/flask'), // Flask
      '/python/django/': generateSidebar('docs','python/django'), // Django
      '/python/fastapi/': generateSidebar('docs','python/fastapi'), // FastAPI
      '/python/spider/': generateSidebar('docs','python/spider'), // 爬虫
      '/python/auto/': generateSidebar('docs','python/auto'), // 自动化办公
      '/python/analysis/': generateSidebar('docs','python/analysis'), // 数据分析
      '/web/html_css/': generateSidebar('docs','web/html_css'), // HTML+CSS
      '/web/javascript/': generateSidebar('docs','web/javascript'), // JavaScript
      '/web/vue/': generateSidebar('docs','web/vue'), // Vue
      '/web/react/': generateSidebar('docs','web/react'), // React
      '/java/EE/': generateSidebar('docs','java/EE'), // java EE
      '/java/web/': generateSidebar('docs','java/web'), // java web
      '/java/ssm/': generateSidebar('docs','java/ssm'), // ssm
      '/java/boot/': generateSidebar('docs','java/boot'), // springboot
      '/java/cloud/': generateSidebar('docs','java/cloud'), // springcloud
      '/DevOps/docker/': generateSidebar('docs','DevOps/docker'), // docker
      '/DevOps/kubernetes/': generateSidebar('docs','DevOps/kubernetes'), // k8s
      '/DevOps/ansible/': generateSidebar('docs','DevOps/ansible'), // ansible
      '/DevOps/jenkins/': generateSidebar('docs','DevOps/jenkins'), // jenkins
      '/DevOps/git/': generateSidebar('docs','DevOps/git'), // git
      '/life-note/read/': generateSidebar('docs','life-note/read'), // 阅读
      '/life-note/essay/': generateSidebar('docs','life-note/essay'), // 随笔
      '/life-note/exer/': generateSidebar('docs','life-note/exer'), // 运动
      '/life-note/other/': generateSidebar('docs','life-note/other'), // 其他
      '/life-note/life/': generateSidebar('docs','life-note/life'), // 生活

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
