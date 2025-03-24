// navData.ts
export interface NavItem {
    text: string;
    link: string;
    desc?: string;
    icon?: string;
  }
  
  export interface NavGroup {
    title: string;
    items: NavItem[];
  }
  
  export const navGroups: NavGroup[] = [
    {
      title: "前端框架",
      items: [
        { text: "Vue3", link: "/frontend/vue", desc: "渐进式框架", icon: "🖖" },
        { text: "React", link: "/frontend/react", desc: "组件化方案", icon: "⚛️" },
      ]
    },
    {
      title: "工具链",
      items: [
        { text: "Vite", link: "/tools/vite", desc: "下一代构建工具" },
        { text: "Webpack", link: "/tools/webpack" },
      ]
    }
  ];