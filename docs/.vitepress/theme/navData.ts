// navData.ts
export interface NavItem {

    text: string;
    link: string;
    desc?: string;
    icon?: string;
  }
  export interface NavGroup {
    title: string;
    id: string; // 新增锚点ID字段
    items: NavItem[];
  }
  
  export interface NavGroup {
    title: string;
    items: NavItem[];
  }
  
  export const navGroups: NavGroup[] = [
    {
      title: "常用工具",
      id: "frontend",
      items: [
        { text: "时间戳转换", link: "https://tool.lu/timestamp/", desc: "时间戳转换在线工具", icon: "https://tool.lu/favicon.ico" },
        { text: "React", link: "/frontend/react", desc: "组件化方案", icon: "⚛️" },
      ]
    },
    {
      title: "周刊和博客",
      id: "weekly",
      items: [
        { text: "Vite", link: "/tools/vite", desc: "下一代构建工具" },
        { text: "Webpack", link: "/tools/webpack" },
      ]
    },
    {
      title: "阅读书籍",
      id: "books",
      items: [
        { text: "ZLibary", link: "https://zh.kid1412.biz/", desc: "图书资源", icon: "https://zh.kid1412.biz/favicon.ico?v=1" },
        { text: "微信读书", link: "https://weread.qq.com/", desc: "阅读软件", icon: "https://rescdn.qqmail.com/node/wr/wrpage/style/images/independent/favicon/favicon_32h.png"},
      ]
    },
    {
        title: "其他学习资源",
        id: "others",
        items: [
          { text: "VitePress", link: "https://vitepress.yiov.top/", desc: "vitepress文档教程",icon: "https://vitepress.yiov.top/logo.png" },
          { text: "Webpack", link: "/tools/webpack" },
        ]
      },
      {
        title: "AI工具",
        id: "ai",
        items: [
          { text: "VitePress", link: "https://vitepress.yiov.top/", desc: "vitepress文档教程",icon: "https://vitepress.yiov.top/logo.png" },
          { text: "Webpack", link: "/tools/webpack" },
        ]
      }
    
  ];