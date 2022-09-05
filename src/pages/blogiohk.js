import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";


const features = [
  {
    title: "Những gì bạn cần biết Layer 1 và Layer 2",
    imageUrl: "/docs1/2022/08/img/2022-08-05-layer-1-layer-2-all-you-need-to-know.007.jpeg",
    targetUrl: "/docs1/2022/08/2022-08-05-layer-1-layer-2-all-you-need-to-know",
    description: (
      <>
        Khi thảo luận về kiến trúc blockchain, các thuật ngữ 'Layer 1' và 'Layer 2' thường được đề cập. Đây là những khái niệm quan trọng phục vụ hai mục đích: giải thích cách mạng lưới blockchain được xây dựng và cung cấp hình ảnh trực quan dễ hiểu về mạng lưới blockchain trông như thế nào.
      </>
    ),
  },
  {
    title: "Kachina: hợp đồng thông minh bảo vệ quyền riêng tư",
    imageUrl: "/docs1/2022/08/img/2022-08-05-kachina-privacy-preserving-smart-contracts.007.jpeg",
    targetUrl: "/docs1/2022/08/2022-08-05-kachina-privacy-preserving-smart-contracts",
    description: (
      <>
        Tận dụng ZK Snarks để kích hoạt chức năng hợp đồng thông minh bảo vệ quyền riêng tư mà không hy sinh các đặc điểm phi tập trung.
      </>
    ),
  },
  {
    title: "Giới thiệu Ofelimos : giao thức đồng thuận bằng chứng công việc hữu ích",
    imageUrl: "/docs1/2022/08/img/2022-08-16-introducing-ofelimos-a-proof-of-useful-work-consensus-protocol.007.png",
    targetUrl: "/docs1/2022/08/2022-08-16-introducing-ofelimos-a-proof-of-useful-work-consensus-protocol",
    description: (
      <>
        Nghiên cứu của IOG giới thiệu một giao thức đồng thuận mới, an toàn có thể chứng minh được để giảm thiểu sự lãng phí năng lượng của các blockchains bằng chứng công việc.
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
    <Layout description="Cardano Developer Portal">
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
