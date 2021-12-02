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
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/2.png',
    organizationName: 'cardanovn', // Usually your GitHub org/user name.
    projectName: 'cardanovn-portal', // Usually your repo name.

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/cardano2vn/cardanovn-portal/edit/main/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/cardano2vn/cardanovn-portal/edit/main/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
        navbar: {
            title: 'Cardano2vn',
            logo: {
                alt: 'Cardano2vn Logo',
                src: 'img/2.png',
            },
            items: [{
                    type: 'doc',
                    docId: 'getting-started/overview',
                    position: 'left',
                    label: 'Bắt đầu',
                },
                { to: '/blog', label: 'Blog', position: 'left' },
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
                    }, ],
                },
                {
                    title: 'Cộng đồng',
                    items: [{
                            label: 'Telegram',
                            href: 'https://telegram.org/',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/',
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
                            label: 'GitHub',
                            href: 'https://github.com/',
                        },
                        { 
                            label: "About Us",
                            to: "/about-us",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} cardano2vn.io,. Break the blocks`,
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
    }),
};

module.exports = config;