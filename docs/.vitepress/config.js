module.exports = {
  title: 'Temporal',
  description: '下一代 JS 日期/时间 API Temporal',
  lang: 'zh-CN',
  head: [
    ['meta', { name: 'keywords', content: 'temporal,Temporal,JS Temporal,Temporal API' }],
  ],
  themeConfig: {
    // nav: [
    //   { text: "文档", link: "/guide/" },
    //   { text: "API", link: "/api/" },
    // ],
    sidebar: {
      '/guide/': [
        {
          text: '文档',
          link: '/guide/',
          children: [
            {
              text: '简介',
              link: '/guide/introduction',
            }
          ]
        },
        {
          text: '概念',
          link: '/guide/concept/',
          children: [
            {
              text: '挂钟时间（wall-clock time）',
              link: '/guide/concept/wall-clock-time',
            }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Temporal.Now',
          link: '/api/Temporal-Now',
        },
        {
          text: 'Temporal.Instant',
          link: '/api/Temporal-Instant',
        },
        {
          text: 'Temporal.ZonedDateTime',
          link: '/api/Temporal-ZonedDateTime',
        },
        {
          text: 'Temporal.PlainDate',
          link: '/api/Temporal-PlainDate',
        },
        {
          text: 'Temporal.PlainTime',
          link: '/api/Temporal-PlainTime',
        },
        {
          text: 'Temporal.PlainDateTime',
          link: '/api/Temporal-PlainDateTime',
        },
        {
          text: 'Temporal.PlainYearMonth',
          link: '/api/Temporal-PlainYearMonth',
        },
        {
          text: 'Temporal.PlainMonthDay',
          link: '/api/Temporal-PlainMonthDay',
        },
        {
          text: 'Temporal.Duration',
          link: '/api/Temporal-Duration',
        },
        {
          text: 'Temporal.TimeZone',
          link: '/api/Temporal-TimeZone',
        },
        {
          text: 'Temporal.Calendar',
          link: '/api/Temporal-Calendar',
        },

      ]
    }
  }
}
