import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Bắt đầu',
    Svg: require('../../static/img/card-get-started.svg').default,
    description: (
      <>
        Tìm hiểu tổng quan về Cardano, hiểu các thành phần, khám phá các công cụ xây dựng, tìm hiểu các khái niệm kỹ thuật và kết nối cộng đồng nhà phát triển.
      </>
    ),
  },
  {
    title: 'Tạo Hợp đồng thông minh',
    Svg: require('../../static/img/card-smart-contracts.svg').default,
    description: (
      <>
        Khám phá Marlowe và Plutus và tìm hiểu cách tạo hợp đồng thông minh trên Cardano
      </>
    ),
  },
  {
    title: 'Tích hợp Cardano',
    Svg: require('../../static/img/card-integrate-cardano.svg').default,
    description: (
      <>
        Khám phá ví Cardano và tìm hiểu cách tích hợp Cardano vào các ứng dụng và trang web
      </>
    ),
  },
  {
    title: 'Xây dựng với Siêu dữ liệu giao dịch',
    Svg: require('../../static/img/card-transaction-metadata.svg').default,
    description: (
      <>
        Tìm hiểu siêu dữ liệu giao dịch là gì, cách thêm siêu dữ liệu vào giao dịch, cách xem siêu dữ liệu và tiềm năng thực tế.
      </>
    ),
  },
  {
    title: 'Khám phá mã thông báo gốc',
    Svg: require('../../static/img/card-native-tokens.svg').default,
    description: (
      <>
        Mã thông báo gốc là gì, cách đúc chúng, cách tạo NFT và tại sao bạn không cần hợp đồng thông minh cho tất cả những điều này.
      </>
    ),
  },
  {
    title: 'Khóa đào tạo Plutus của Dr. Lars',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Dr. Lars Brünjes là giám đốc giáo dục của IOHK. Khóa đào tạo hợp đồng thông minh Plutus này của ông là khóa đầu tiên, cơ bản và tổng hợp nhất về Plutus. Khóa đào tạo gồm 10 video và được chuyển thành 10 tài liệu bài giảng.
      </>
    ),
  },
  {
    title: 'Vận hành một  Stake Pool',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Tìm hiểu những gì cần thiết để trở thành nhà điều hành nhóm cổ phần Cardano (Stake Pool) từ góc độ kỹ thuật và tiếp thị.
      </>
    ),
  },
  {
    title: 'Trở thành một phần của Quản trị',
    Svg: require('../../static/img/card-governance.svg').default,
    description: (
      <>
        Quản trị là một chủ đề thiết yếu bao gồm các Đề xuất Cải tiến Cardano (CIP), tài trợ dự án, bỏ phiếu và các thông số mạng.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
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
