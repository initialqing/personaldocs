import { defaultTheme } from '@vuepress/theme-default'

export default {
    lang: 'zh-CN',
    colorMode: 'auto',
    base: '/',
    description: "个人知识记录网站",
    title: "DemoTitle",
    port: "3333",
    dest: 'docs/.vuepress/dist',
    head: [
        [
            'link',
            { rel: 'icon', href: 'book.png' }
        ]
    ],
    displayAllHeaders: true,
    // 显示在导航栏的左端
    theme: defaultTheme({
        // 主题配置
        logo: '/assets/img/fankaishu.png',
        colorMode: 'auto',
        colorModeSwitch: true,
        home: '/',
        sidebarDepth:2,
         // 默认值：false
        navbar: [
            { text: '主页', link: '/' },
            { text: 'Vue', link: '/vue/' },
            { text: 'JavaScript', link: '/js/' },
            { text: 'Css', link: '/css/' },
            { text: 'TypeScript', link: '/typescript/' },
            { text: '算法总结', link: '/algorithm/' },
            { text: 'Github', link: 'https://github.com/initialqing/personaldocs' },
        ],
        sidebar: {
            '/css/': [
                {
                    text: 'Css基础',
                    collapsible: true,
                    children: [
                        { text: 'Css-a', link: '/css/base/css-a' },
                        { text: 'Css-b', link: '/css/base/css-b' }
                    ]
                },
                {
                    text: 'Css进阶',
                    collapsible: true,
                    children: [
                        { text: 'Css-c', link: '/css/promote/css-c' },
                    ]
                },
                {
                    text: '面试',
                    collapsible: true,
                    children: [
                        { text: 'Css-d', link: '/css/interview/css-d' },
                    ]
                }
            ],
            '/typescript/': [
                {
                    text: 'Ts基础',
                    collapsible: false,
                    children: [
                        // 使用英文就不需要加入md后缀
                        { text: '接口 枚举 类型断言', link: '/typescript/base/jiekou' },
                        { text: '数据表达', link: '/typescript/base/数据表达.md' },
                        { text: '类型系统', link: '/typescript/base/类型系统.md' },
                        { text: '字面量 泛型', link: '/typescript/base/字面量.md' },
                        { text: 'UnionType', link: '/typescript/base/uniontype.md' }
                    ]
                }
            ],
            '/vue/': [
                {
                    text: 'Vue基础',
                    collapsible: false,
                    children: [
                        { text: '响应式基础', link: '/vue/base/reactive' },
                    ]
                }
            ],
            '/algorithm/': [
                {
                    text: '算法专题',
                    collapsible: false,
                    link: '/algorithm/README.md'
                },
                {
                    text: '动态规划',
                    collapsible: false,
                    children: [
                        { text: '子序列问题', link: '/algorithm/dp/subsequence' },
                    ]
                },
                {
                    text: '二分查找',
                    collapsible: false,
                    children: [
                        { text: '查找', link: '/algorithm/binarysearch/binary' },
                    ]
                },
                {
                    text: 'dfs&bfs',
                    collapsible: false,
                    children: [
                        { text: 'bfs&dfs', link: '/algorithm/dfs&bfs/bfs' },
                    ]
                },
                {
                    text: '二叉树相关',
                    link: '/algorithm/binarytree/',
                    collapsible: false,
                    children: [
                        { text: '二叉树遍历', link: '/algorithm/binarytree/order' },
                        { text: '二叉搜索树', link: '/algorithm/binarytree/binarysearchtree' },
                        { text: '二叉树的公共祖先', link: '/algorithm/binarytree/ancestor' },
                        { text: '二叉树的构造', link: '/algorithm/binarytree/refactor' },
                        { text: '二叉树的属性', link: '/algorithm/binarytree/Attributes' },
                    ]
                },
                {
                    text: '回溯算法',
                    link: '/algorithm/backtracking/',
                }
            ]
        }
    }),
    markdown: {
        toc: {
            level: [1, 2,3]
        },
    }
}