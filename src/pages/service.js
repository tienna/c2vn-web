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
    title: "Operating stake pool as a service",
    name: "C2VN",
    imageUrl: "img/service/dichvu1.png",
    targetUrl: "https://cardano2vn.io",
    description: (
      <>
        Operating stake pool as a service
      </>
    ),
  },
  {
    title: "Stake Pool  cost optimization",
    name: "C2VN",
    imageUrl: "img/service/dichvu2.png",
    targetUrl: "https://cardano2vn.io",
    description: (
      <>
        Stake Pool  cost optimization.
      </>
    ),
  },
  {
    title: "Hardening Stake Pool ",
    name: "C2VN",
    imageUrl: "img/service/dichvu3.png",
    targetUrl: "https://cardano2vn.io",
    description: (
      <>
        Hardening Stake Pool.
      </>
    ),
  },  
    {
    title: "Monitoring Stake pools as a service",
    name: "C2VN",
    imageUrl: "img/service/dichvu4.png",
    targetUrl: "https://cardano2vn.io",
    description: (
      <>
        Monitoring Stake pools as a service
      </>
    ),
  },
  {
    title: "Open ISPO",
    name: "C2VN",
    imageUrl: "img/service/dichvu5.png",
    targetUrl: "https://cardano2vn.io",
    description: (
      <>
        Open ISPO
      </>
    ),
  },
  {
    title: "Cardano wallet  integration ",
    name: "C2VN",
    imageUrl: "img/service/dichvu6.png",
    targetUrl: "https://cardano2vn.io",
    description: (
      <>
        Cardano wallet  integration.
      </>
    ),
  },
];

  
function Feature({ imageUrl, title, description, targetUrl, name }) {

  const imgUrl = useBaseUrl(imageUrl); // not used right now 
  const trgUrl = useBaseUrl(targetUrl);
  //const href=useBaseUrl("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css")
  return (
    <div className={clsx("col col--4", styles.featurePadding)}>
      <div> 
        
         <h3>  {title}</h3>
      </div>
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
 
                            
          </div>
	 </div>
            <div className="card__body">
              <p>{description}</p>
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
      	title={'Dịch vụ của C2VN'}
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
 
    </Layout>
  );
}

export default Home;
