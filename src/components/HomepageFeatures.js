import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

const FeatureList = [
  {
    title: 'Bắt đầu',
    Svg: require('../../static/img/card-get-started.svg').default,
    description: (
      <>
        Tìm hiểu tổng quan về Cardano, hiểu các thành phần, khám phá các công cụ xây dựng, tìm hiểu các khái niệm kỹ thuật và kết nối cộng đồng nhà phát triển.
      </>
    ),
    targetUrl: "docs/getting-started/overview",
  },
  {
    title: 'Tạo Hợp đồng thông minh',
    Svg: require('../../static/img/card-smart-contracts.svg').default,
    description: (
      <>
        Khám phá Marlowe và Plutus và tìm hiểu cách tạo hợp đồng thông minh trên Cardano
      </>
    ),
    targetUrl: "docs/smart-contracts/overview",
  },
  {
    title: 'Tích hợp Cardano',
    Svg: require('../../static/img/card-integrate-cardano.svg').default,
    description: (
      <>
        Khám phá ví Cardano và tìm hiểu cách tích hợp Cardano vào các ứng dụng và trang web
      </>
    ),
    targetUrl: "docs/integrate-cardano/note",
  },
  {
    title: 'Xây dựng với Siêu dữ liệu giao dịch',
    Svg: require('../../static/img/card-transaction-metadata.svg').default,
    description: (
      <>
        Tìm hiểu siêu dữ liệu giao dịch là gì, cách thêm siêu dữ liệu vào giao dịch, cách xem siêu dữ liệu và tiềm năng thực tế.
      </>
    ),
    targetUrl: "docs/transaction-metadata/overview"
  },
  {
    title: 'Khám phá mã thông báo gốc',
    Svg: require('../../static/img/card-native-tokens.svg').default,
    description: (
      <>
        Mã thông báo gốc là gì, cách đúc chúng, cách tạo NFT và tại sao bạn không cần hợp đồng thông minh cho tất cả những điều này.
      </>
    ),
    targetUrl: "docs/native-tokens/overview"
  },
  {
    title: 'Khóa đào tạo Plutus của Dr. Lars',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Dr. Lars Brünjes là giám đốc giáo dục của IOHK. Khóa đào tạo hợp đồng thông minh Plutus này của ông là khóa đầu tiên, cơ bản và tổng hợp nhất về Plutus. Khóa đào tạo gồm 10 video và được chuyển thành 10 tài liệu bài giảng.
      </>
    ),
    targetUrl: "docs/dr-lars-lession/overview"
  },
  {
    title: 'Vận hành một  Stake Pool',
    Svg: require('../../static/img/card-operate-a-stake-pool.svg').default,
    description: (
      <>
        Tìm hiểu những gì cần thiết để trở thành nhà điều hành nhóm cổ phần Cardano (Stake Pool) từ góc độ kỹ thuật và tiếp thị.
      </>
    ),
    targetUrl: "docs/operate-a-stake-pool/note"
  },
  {
    title: 'Trở thành một phần của Quản trị',
    Svg: require('../../static/img/card-governance.svg').default,
    description: (
      <>
        Quản trị là một chủ đề thiết yếu bao gồm các Đề xuất Cải tiến Cardano (CIP), tài trợ dự án, bỏ phiếu và các thông số mạng.
      </>
    ),
    targetUrl: "docs/be-apart-of-governance/overview"
  },
];

// function Feature({Svg, title, description}) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} alt={title} />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <h3>{title}</h3>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

function Feature({ Svg, title, description, targetUrl }) {
  // const imgUrl = useBaseUrl(imageUrl); // not used right now
  const trgUrl = useBaseUrl(targetUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {targetUrl && (
        <Link className="navbar__link" to={trgUrl}>
          <div className="card">
            <div className="card__header">
                <div className="text--center">
                  <Svg className={styles.featureSvg} alt={title} />
                </div>
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

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
