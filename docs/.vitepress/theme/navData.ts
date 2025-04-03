// navData.ts
export interface NavItem {

    text: string;
    link: string;
    desc?: string;
    icon?: string;  // 支持 Emoji、图片URL、图标类名
  }
  export interface NavGroup {
    title: string;
    id: string; // // 必须唯一，用于锚点
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
          { text: "DeepSeek", link: "https://chat.deepseek.com/", desc: "可以帮你写代码、读文件、写作各种创意内容",icon: "https://chat.deepseek.com/favicon.svg" },
          { text: "kimi", link: "https://kimi.moonshot.cn/", desc: "会推理解析，能深度思考的AI助手",icon: "https://statics.moonshot.cn/kimi-chat/favicon.ico" },
          { text: "豆包", link: "https://www.doubao.com/chat/", desc: "字节跳动推出的免费AI智能助手",icon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo-doubao-overflow.png" },
          { text: "deepseek官方提示词库", link: "https://api-docs.deepseek.com/zh-cn/prompt-library/", desc: "探索 DeepSeek 提示词样例，挖掘更多可能",icon: "https://cdn.deepseek.com/platform/favicon.png" },

        ]
      }
    
  ];