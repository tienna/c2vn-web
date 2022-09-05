import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import HomepageHeader from "./headpage";
import PortalHero from "./portalhero";

const features = [
  {
    title: "Cardano developer courseware in Uni",
    imageUrl: "img/Catalyst-funds/cardano-developer-courseware-in-university.jpg",
    targetUrl: "https://cardano.ideascale.com/c/idea/418098",
    description: (
      <>
        University students are the future developer of blockchain but these developers can't afford formal basic and blockchain programming courses.
      </>
    ),
  },
  {
    title: "Cardano developer club in Uni",
    imageUrl: "img/Catalyst-funds/Cardano-developer-club-in-Uni.jpg",
    targetUrl: "https://cardano.ideascale.com/c/idea/415632",
    description: (
      <>
        IT students - developer resources are currently lacking an environment (Lab, exercise, reference document, hackathon..) to practice and experience building dApps on the blockchain platform.
      </>
    ),
  },
  {
    title: "Catalyst Events 4 Vietnam Students",
    imageUrl: "img/Catalyst-funds/catalyst-Evens-4-Vietnam-Students.png",
    targetUrl: "https://cardano.ideascale.com/c/idea/418484",
    description: (
      <>
        Many Vietnam University students are unaware of Project Catalyst's funding campaigns and the opportunities which are existing..
      </>
    ),
  },
  
    
];

function Feature({ imageUrl, title, description, targetUrl }) {
  const imgUrl = useBaseUrl(imageUrl); // not used right now
  const trgUrl = useBaseUrl(targetUrl);
  return (
    <div className={clsx("col col--4", styles.featurePadding)}>
      {targetUrl && (
        <Link className="navbar__link" to={trgUrl}>
          <div className="card">
            <div className="card__header">
              {imgUrl && (
                <div className="text--center">
                  <img
                    className={styles.featureImage}
                    src={imgUrl}
                    alt={title}
                  />
                </div>
              )}
              <h3>{title}</h3>
            </div>
            <div className="card__body">
              <p>{description}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout description="Catalyst">
      <HomepageHeader 
      	title={'CATALYST FUND9'}
      />
      <main>
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
      </main>
      <PortalHero
        title={'Hãy vote chúng tôi'}
        description={'Cardano2vn luôn đồng hành cùng bạn'}
        cta={'Get Started'}
        url={useBaseUrl("docs/getting-started/overview")}
      />
    </Layout>
  );
}

export default Home;
