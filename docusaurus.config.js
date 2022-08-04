// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Cardano2vn',
    tagline: 'Bứt phá giới hạn',
    url: 'https://cardano2vn.io',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo/2.png',
    organizationName: 'cardanovn', // Usually your GitHub org/user name.
    projectName: 'cardanovn-portal', // Usually your repo name.
    presets: [
        [
            '@docusaurus/preset-classic',
            // /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/cardano2vn/cardanovn-portal/edit/main/',
                },
               /* blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/cardano2vn/cardanovn-portal/edit/main/blog/',
                },*/
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'G-NYJGVMHGCD',
        path: './docs1',
        routeBasePath: 'docs1',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        // ... other options
      },
    ],
  ],    
    themeConfig:
    
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        googleAnalytics: {
            trackingID: 'G-NYJGVMHGCD',
            anonymizeIP: true,
        },
        gtag: {
            trackingID: 'G-NYJGVMHGCD',
            anonymizeIP: true,
        },
        navbar: {
            title: 'Cardano2vn',
            logo: {
                alt: 'Cardano2vn Logo',
                src: 'img/logo/2.png',
            },
            items: [{
                type: 'doc',
                docId: 'getting-started/overview',
                position: 'left',
                label: 'Bắt đầu',
            },
		    {to: '/docs1/intro', label: 'Blog-iohk', position: 'left'},
            //{ to: '/blog', label: 'Blog', position: 'left' },
            { to: '/dapps-connector', label: 'DApps Connector', position: 'left' },
            //{ to: '/docs/nami', label: 'Nami Connector', position: 'left' },
            {
                href: 'http://194.233.73.17:3000/buy.html',
                label: 'Nami Connector',
                position: 'left',
            },
            {
                href: 'https://github.com/cardano2vn',
                label: 'GitHub',
                position: 'right',
            },

        ],
    },
    footer: {
        style: 'dark',
        links: [{
            title: 'Tài liệu',
            items: [{
                label: 'Bắt đầu',
                to: '/docs/getting-started/overview',
            },],
        },
        {
            title: 'Cộng đồng',
            items: [{
                label: 'Telegram',
                href: 'https://t.me/cardano2vn',
            },
            {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCJTdAQPGJntJet5v-nk9ebA',
            },
            {
                label: 'Github',
                href: 'https://github.com/cardano2vn',
            },
            ],
        },
        {
            title: 'More',
            items: [{
                label: 'Blog',
                to: '/blog',
            },
            { 
                label: "About Us",
                to: "/about-us",
            },],
        },],
        copyright: `The content of this site is referenced and copied from the <a href="https://developers.cardano.org/" target="_blank" rel="noopener noreferrer">Cardano Developer</a>, ${new Date().getFullYear()}`,
    },
    prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
    },}),
};

module.exports = config;
