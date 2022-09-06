module.exports = {
    head: [
        [
            'link',
            { rel: 'icon', href: 'book.png' }
        ]
    ],
    description: "个人知识记录网站",
    title: "DemoTitle",
    port: "3333",
    themeConfig: {
        logo: '/assets/img/fankaishu.png',
        nav: [
            { text: '主页', link: '/' },
            { text: 'Vue', link: '/vue/' },
            { text: 'JavaScript', link: '/js/' },
            { text: 'Css', link: '/css/' },
            { text: 'TypeScript', link: '/typescript/' },
            { text: 'Github', link: 'https://github.com/initialqing/docs' },
        ],
        sidebar: {
            '/css/': [
                {
                    title: 'Css基础',
                    collapsable: false,
                    children: [
                        { title: 'css - a', path: '/css/base/css-a' },
                        { title: 'css - b', path: '/css/base/css-b' }
                    ]
                },
                {
                    title: 'Css进阶',
                    collapsable: false,
                    children: [
                        { title: 'css - c', path: '/css/promote/css-c' }
                    ]
                },
                {
                    title: '面试',
                    collapsable: false,
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
                        { title: '接口 枚举 类型断言', path: '/typescript/base/jiekoumeiju' },
                        { title: '数据表达', path: '/typescript/base/dataexpress' },
                        { title: '类型系统', path: '/typescript/base/typesystem' },
                        { title: '字面量 泛型', path: '/typescript/base/zimianliangfanxing' },
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
            ]
        }
    },

}