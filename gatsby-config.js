module.exports = {
  siteMetadata: {
    title: 'tanimon\'s Blog',
    author: {
      name: 'tanimon',
      summary: '20代後半SIer勤務👨‍💼好奇心が強すぎる雑食系エンジニア👨‍💻仕事にやりがいを見出だせず、収入を会社に依存していることに危機感😱稼ぐ力を高めるために、Web技術勉強中🌐最近はRustに浮気中🦀Apple信者のVim教徒です😎',
    },
    description: '20代エンジニアが稼ぐ力を身につけるために勉強したことをアウトプットするブログ。',
    siteUrl: 'https://tanimon.vercel.app',
    social: {
      twitter: 'tanimon_dev',
    },
    profilePic: 'src/images/profile-pic.png',
  },
  plugins: [
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-T3JV7T60S2", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            // eslint-disable-next-line max-len
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.nodes.map((node) => ({
              ...node.frontmatter,
              description: node.excerpt,
              date: node.frontmatter.date,
              url: site.siteMetadata.siteUrl + node.fields.slug,
              guid: site.siteMetadata.siteUrl + node.fields.slug,
              custom_elements: [{ 'content:encoded': node.html }],
            })),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'tanimon\'s Blog',
        short_name: 'tanimon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-typegen',
    'gatsby-plugin-eslint',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
