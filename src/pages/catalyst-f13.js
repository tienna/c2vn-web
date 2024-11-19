import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";


const features = [
    {
        title: "[C2VN] Promoting Cardano Blockchain Education in Universities",
        name: "F13: Cardano Open: Ecosystem",
        score: "4.75",
        imageUrl: "img/Catalyst-funds/cardano-developer-courseware-in-university.jpg",
        targetUrl: "https://cardano.ideascale.com/c/cardano/idea/128677",
        description: (
            <>
                Our goal is to embed blockchain education within the university landscape. This involves delivering workshops, discussions, and nurturing active research activities focused on blockchain technology.
            </>
        ),
    },

    {
        title: " [C2VN] Cardano Bootcamp & Hackathon Series for University Students",
        name: "F13: Cardano Use Cases: Concept",
        score: "4.73",
        imageUrl: "img/Catalyst-funds/Cardano-developer-club-in-Uni.jpg",
        targetUrl: "https://cardano.ideascale.com/c/cardano/idea/130262",
        description: (
            <>
                Lowering barrier to entry by providing free developer bootcamps and hackathons for university students, covering basic to advanced concepts, culminating in an NFT certificate to showcase their skills.
            </>
        ),
    },

    {
        title: "[C2VN-VTC]Moodle Learning Management System on Cardano",
        name: "F13: Cardano Use Cases: Concept",
        score: "4.68",
        imageUrl: "img/Catalyst-funds/catalyst-Evens-4-Vietnam-Students.png",
        targetUrl: "https://cardano.ideascale.com/c/cardano/idea/132135",
        description: (
            <>
                Our solution is to develope a module that integrates with Moodle (a popular open-source LMS). This module will enable learners to record and verify their achievements on the Cardano blockchain.
            </>
        ),
    },

    {
        title: "[C2VN]: Lucid (off-chain code) video course for non-native English communities Developers",
        name: "F13: Cardano Open: Ecosystem",
        score: "4.68",
        imageUrl: "img/Catalyst-funds/catalyst-Evens-4-Vietnam-Students.png",
        targetUrl: "https://cardano.ideascale.com/c/cardano/idea/127529",
        description: (
            <>
                Our solution is to create a Lucid (off-chain) video course in the native language. This will allow Non-Native English Community Developers to learn and interact with Cardano.
            </>
        ),
    },

    {
        title: "[C2VN]: Opshin smart contract video course for non-native English communities developers",
        name: "F13: Cardano Open: Ecosystem",
        score: "4.68",
        imageUrl: "img/Catalyst-funds/catalyst-Evens-4-Vietnam-Students.png",
        targetUrl: "https://cardano.ideascale.com/c/cardano/idea/127532",
        description: (
            <>
                Because this is the Opshin smart contract programming course for Vietnamese people via video on the YouTube channel, it cannot be edited. Only suggestions can be made for us to supplement and adjust the videos for this course in subsequent reprints.
            </>
        ),
    },

    {
        title: "[C2VN]: Promoting education through the development of Blockchain lecturer teams at universities in Vietnam (Phase 2)",
        name: "F13: Cardano Open: Ecosystem",
        score: "4.68",
        imageUrl: "img/Catalyst-funds/catalyst-Evens-4-Vietnam-Students.png",
        targetUrl: "https://cardano.ideascale.com/c/cardano/idea/127548",
        description: (
            <>
                This is a project to develop Blockchain lecturers for universities in Vietnam. We learn Blockchain programming on-chain and off-chain together. Therefore, we can only share videos recording the discussions.
            </>
        ),
    },
];


function Feature({ imageUrl, title, description, targetUrl, name, score }) {
    const imgUrl = useBaseUrl(imageUrl); // not used right now 
    const trgUrl = useBaseUrl(targetUrl);

    return (
        <div className={clsx("col col--4", styles.featurePadding)}>
            {targetUrl && (

                <Link className="navbar__link" to={trgUrl}>
                    <div className="card">
                        <div className="card__header">
                            <h4> {title}</h4>
                            {imgUrl && (
                                <div className="text--left">
                                    <p>{description}</p>
                                </div>
                            )}


                        </div>
                    </div>
                    <div className="card__body">
                    </div>

                </Link>
            )}
        </div>
    );
}

function Home() {
    return (
        <Layout description="Catalyst">

            <main>
                <section className={styles.features}>
                    <div className="container">
                        <h3> Review and vote for our proposals in Project Catalyst F13</h3>
                    </div>
                </section>

                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">

                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>



                )}
                <section className={styles.features}>
                    <div className="container">
                        <h4> Thank you for your strong support </h4>
                    </div>
                </section>
            </main>

        </Layout>
    );
}

export default Home;
