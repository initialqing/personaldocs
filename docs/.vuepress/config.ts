import { defaultTheme } from '@vuepress/theme-default'
export default {
    lang: 'zh-CN',
    head: [
        [
            'link',
            { rel: 'icon', href: 'book.png' }
        ]
    ],
    colorMode: 'auto',
    base: '/personaldocs/',
    description: "个人知识记录网站",
    title: "DemoTitle",
    port: "3333",
    dest: 'docs/.vuepress/dist',
    // 显示在导航栏的左端
    theme: defaultTheme({
        // 主题配置
        logo: '/assets/img/fankaishu.png',
        colorMode: 'auto',
        colorModeSwitch: true,
        home: '/',
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
                    collapsible: true,
                },
                {
                    text: '算法总结',
                    collapsible: false,
                    children: [
                        { text: '查找', link: '/algorithm/binarysearch/binary' },
                    ]
                }
            ]
        }
    })
}