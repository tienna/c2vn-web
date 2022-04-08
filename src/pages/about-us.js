import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './about-us.module.css';
import TeamMembers from '../components/TeamMembers';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
        return (
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className={clsx("container", styles.container)}>
                <h1 className="hero__title">Đội ngũ</h1>
                {/* <div className={styles.buttons}>
                <Link
                    className="button button--secondary button--lg"
                    to="/docs/getting-started/overview">
                    Bắt đầu
                </Link>
                </div> */}
            </div>
            </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
        return (
            <Layout
                title={`About Us`}
                description="Mang Cardano về Việt Nam">
                <HomepageHeader />
                <main>
                    <TeamMembers />
                </main>
            </Layout>
    );
}
