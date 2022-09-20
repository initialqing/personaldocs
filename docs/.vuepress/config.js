import { defaultTheme } from '@vuepress/theme-default'
export default {
    theme: defaultTheme({
        lang:'zh-CN',
        head: [
            [
                'link',
                { rel: 'icon', href: 'book.png' }
            ]
        ],
        colorMode:'auto',
        base: '/personaldocs/',
        description: "个人知识记录网站",
        title: "DemoTitle",
        port: "3333",
        dest: 'docs/.vuepress/dist',
        // 显示在导航栏的左端
        logo: '/assets/img/fankaishu.png',
        // dest:'public',
        themeConfig: {
            logo: '/assets/img/fankaishu.png',
            lastUpdated: '上次更新', // string | boolean
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
                            { title: 'css - a', path: '/css/base/css-a' },
                            { title: 'css - b', path: '/css/base/css-b' }
                        ]
                    },
                    {
                        text: 'Css进阶',
                        collapsible: true,
                        children: [
                            { title: 'css - c', path: '/css/promote/css-c' }
                        ]
                    },
                    {
                        text: '面试',
                        collapsable: true,
                        children: [
                            { title: 'css - c', path: '/css/interview/css-d' }
                        ]
                    }
                ],
                '/typescript/': [
                    {
                        title: 'Ts基础',
                        collapsable: false,
                        children: [
                            { title: '接口 枚举 类型断言', path: '/typescript/base/接口枚举' },
                            { title: '数据表达', path: '/typescript/base/数据表达' },
                            { title: '类型系统', path: '/typescript/base/类型系统' },
                            { title: '字面量 泛型', path: '/typescript/base/字面量' },
                            { title: 'UnionType', path: '/typescript/base/uniontype' }
                        ]
                    }
                ],
                '/vue/': [
                    {
                        title: 'Vue基础',
                        collapsable: false,
                        children: [
                            { title: '响应式基础', path: '/vue/base/reactive' },
                        ]
                    }
                ],
                '/algorithm/':[
                    {
                        'title':'算法专题',
                        collapsable:false,
                    },
                    {
                        'title':'算法总结',
                        collapsable:false,
                        children:[
                            { title: '查找', path: '/algorithm/binarysearch/binary' },
                        ]
                    }
                ]
            }
        },
    })
    
}