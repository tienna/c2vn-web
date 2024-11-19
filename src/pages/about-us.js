import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import TeamMembers from '../components/TeamMembers';



export default function Home() {
    return (
        <Layout
            title={`About Us`}
            description="Mang Cardano về Việt Nam">
                <main>
                <TeamMembers />
            </main>
        </Layout>
    );
}

