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
                
               /* deep: {
                    sidebarPath: require.resolve('./sidebarsdeepfunding.js'),
                    },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/cardano2vn/cardanovn-portal/edit/main/blog/',
                },*/
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                googleAnalytics: {
                    trackingID: 'G-NYJGVMHGCD',
                    anonymizeIP: true,
                },
                gtag: {
                    trackingID: 'G-NYJGVMHGCD',
                    anonymizeIP: true,
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'Deep-funding',
        path: './Deep-funding',
        routeBasePath: 'Deep-funding',
        sidebarPath: require.resolve('./sidebarsdeepfunding.js'),
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'Marlowe',
        path: './Marlowe',
        routeBasePath: 'Marlowe',
        sidebarPath: require.resolve('./sidebarsmarlowe.js'),
        // ... other options
      },
    ],
  ],    
  
  /*    plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'G-NYJGVMHGCD',
        path: './deep',
        routeBasePath: 'deep',
        sidebarPath: require.resolve('./sidebarsdeepfunding.js'),
        // ... other options
      },
    ],
  ],
*/
  
    themeConfig:
    
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        metadata: [{ name: "cardano,plutus,Haskell, cardano-cli, cardano-node, pool, stake, phần thưởng, ISPO, Shop, ADA,ada ", content: "blog,tech, hub," }],
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
                label: 'CTech hub',
            },
//            {
//                type: 'doc',
//                docId: 'Deep-funding/deep-funding-round-2',
//                position: 'left',
//                label: 'Deep funding',
//            },
	    {
                to: 'Deep-funding/deep-funding-round-2', label: 'Deep funding', position: 'left'
            },
	    {
                to: 'Marlowe/Overview', label: 'Marlowe', position: 'left'
            },
                        	    
	    {
                to: '/docs1/intro', label: 'Blog-iohk', position: 'left'
            },
            //{
            //    to: '/blog', label: 'News', position: 'left' 
            //},
          
 
          //   {
          //      href: 'http://cardano2vn.duckdns.org:9081', label: 'Vesting', position: 'left'
          //  },  
             { 
                to: '/service', label: 'Dịch vụ', position: 'left'
            },
                       
            {
                href: 'http://openispo.cardano2vn.io/', label: 'Open ISPO', position: 'right'
            },
            {
                href: 'https://shop.cardano2vn.io', label: 'Cardano2vn Shop', position: 'right'
            },
            {
                href: 'http://blockchain-demo.cardano2vn.io', label: 'Blockchain Demo', position: 'right'
            },
            //{
            //    to: '/dapps-connector', label: 'DApps Connector', position: 'right' 
           // },
            //{ to: '/blogiohk', label: 'News', position: 'left' },
            //{to: '/C2VN-WMTVN', label: 'News', position: 'left' },

                       
            //{
            //    href: 'http://194.233.73.17:3030/index.html',
            //    label: 'Shop Pay tADA',
            //    position: 'left',
            //},
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
