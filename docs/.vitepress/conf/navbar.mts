import {DefaultTheme } from 'vitepress';
export const nav: DefaultTheme.NavItem[] = [
  {
   
    text: '导航',
    link: '/nav/' // 表示docs/index.md
  },
  {
   
    text: '计算机基础',
    items: [
      {
   
        text: '计算机组成原理',
        link: '/Metering/grouping/' // 表示docs/Metering/grouping/index.md
      },
      {
   
        text: '操作系统',
        link: '/Metering/os/' // 表示docs/Metering/os/index.md
      },
      {
   
        text: '计算机网络',
        link: '/Metering/network/' // 表示docs/Metering/network/index.md
      },
      {
   
        text: '数据库',
        link: '/Metering/database/' // 表示docs/Metering/database/index.md
      },
      {
   
        text: '数据结构与算法',
        link: '/Metering/method/' // 表示docs/Metering/method/index.md
      }
    ]
  },
  {
   
    text: '测试',
    items: [
      {
   
        text: '测试方法与技术',
        link: '/Test/basic/' // 表示docs/Test/basic/index.md
      },
      {
        text: '自动化',
        items: [
        {
  
          text: '接口测试及自动化',
          link: '/Test/auto/interface/' // 表示docs/Test/auto/interface/index.md
        },
        {
     
          text: 'web自动化',
          link: '/Test/auto/web/' // 表示docs/Test/auto/web/index.md
        },
        {
     
          text: 'app自动化',
          link: '/Test/auto/app/' // 表示docs/Test/auto/app/index.md
        }
      ],
    },
      {

        text: '性能测试',
        link: '/Test/performance/' // 表示docs/Test/performance/index.md
      },
  ]
  },
  {
   
    text: 'python',
    items: [
      {text: 'python基础',link: '/python/basic/',activeMatch: '/python/basic/'},
      {text: 'python常用库',link: '/python/lib/'},
      {text: 'flask',link: '/python/flask/'},
      {text: 'django',link: '/python/django/'},
      {text: 'fastapi',link: '/python/fastapi/'},
      {text: '爬虫',link: '/python/spider/'},
      {text: '自动化办公',link: '/python/auto/'},
      {text: '数据分析',link: '/python/analysis/'},
      
    ]
  },
  {
   
    text: '网页编程',
    items: [
      {text: 'HTML+CSS',link: '/web/html_css/' },
      {text: 'JavaScript',link: '/web/javascript/' },
      {text: 'Vue',link: '/web/vue/' },
      {text: 'React',link: '/web/react/' },
    ]
  },
  {
   
    text: 'java',
    items: [
      {text: 'javaEE',link: '/java/EE/'},
      {text: 'javaweb',link: '/java/web/'},
      {text: 'SSM',link: '/java/ssm/'},
      {text: 'Spring Cloud',link: '/java/cloud/'},
      {text: 'Spring Boot',link: '/java/boot/'},
    ]
  },
  {
   
    text: 'DevOps',
    items: [
      {text: 'docker',link: '/DevOps/docker/'},
      {text: 'kubernetes',link: '/DevOps/kubernetes/'},
      {text: 'jenkins',link: '/DevOps/jenkins/'},
      {text: 'git',link: '/DevOps/git/'},
      {text: 'shell',link: '/DevOps/shell/'},
    ]
  },
  {
    text: '中间件技术',
    items: [
      {text: 'Maven',link: '/middle/maven/'},
      {text: 'Tomcat',link: '/middle/tomcat/'},
      {text: 'Nginx',link: '/middle/nginx/'},
      {text: 'ZooKeeper',link: '/middle/zooKeeper/'},
      {text: 'RabbitMQ',link: '/middle/rabbitmq/'},
      {text: 'Nacos',link: '/middle/nacos/'},
      {text: 'Elasticsearch',link: '/middle/elasticsearch/'},
    ]
      
  },
  {
   
    text: '生活笔记',
    items: [
      {
   
        text: '阅读',
        link: '/life-note/read/' // 表示docs/column/Travel/index.md
      },
      {
   
        text: '所思·所想',
        link: '/life-note/Growing/' // 表示docs/column/Growing/index.md
      },
      {

        text: '运动',
        link: '/life-note/exer/' // 表示docs/column/Life/index.md
      },
      {
        text: '生活',
        link: '/life-note/life/' // 表示docs/column/Travel/index.md 
      },
      {
        text: '杂谈',
        link: '/life-note/talk/' // 表示docs/column/Travel/index.md 
      }
    ]
  },
  {
   
    text: '关于',
    items: [
      {text: 'Github', link: 'https://github.com/Jacqueline712' },
      {text: '掘金',link: 'https://juejin.cn/user/3131845139247960/posts'
      },
      {text: '飞书社区',link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'}
    ]
  }
];


