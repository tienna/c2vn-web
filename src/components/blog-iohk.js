import React from 'react';
import clsx from 'clsx';
import styles from './Blog.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

const PortList = [
  {
    title: 'Những gì bạn cần biết Layer 1 và Layer 2 ',
    imageUrl: '../img/team/tienna.jpg',
    //imageUrl:'/docs1/2022/08/img/2022-08-05-layer-1-layer-2-all-you-need-to-know.007.jpeg',
    description: (
      <>
        Khi thảo luận về kiến trúc blockchain, các thuật ngữ 'Layer 1' và 'Layer 2' thường được đề cập. Đây là những khái niệm quan trọng phục vụ hai mục đích: giải thích cách mạng lưới blockchain được xây dựng và cung cấp hình ảnh trực quan dễ hiểu về mạng lưới blockchain trông như thế nào. 
      </>
    ),
	targetUrl: "docs1/2022/08/2022-08-05-layer-1-layer-2-all-you-need-to-know"
  },


  {
    title: 'Kachina: hợp đồng thông minh bảo vệ quyền riêng tư',
    imageUrl: '../img/team/tienna.jpg',
    //imageUrl:'/docs1/2022/08/img/2022-08-05-kachina-privacy-preserving-smart-contracts.007.jpeg',
	
    description: (
		<>
			Tận dụng ZK Snarks để kích hoạt chức năng hợp đồng thông minh bảo vệ quyền riêng tư mà không hy sinh các đặc điểm phi tập trung
		</>
    ),
	targetUrl: "docs1/2022/08/2022-08-05-kachina-privacy-preserving-smart-contracts"
  },


  {
    title: 'Giới thiệu Ofelimos : giao thức đồng thuận bằng chứng công việc hữu ích',
    imageUrl: '../img/team/tienna.jpg',
    //imageUrl:'/docs1/2022/08/img/2022-08-16-introducing-ofelimos-a-proof-of-useful-work-consensus-protocol.007.png',

    description: (
		<>
			Nghiên cứu của IOG giới thiệu một giao thức đồng thuận mới, an toàn có thể chứng minh được để giảm thiểu sự lãng phí năng lượng của các blockchains bằng chứng công việc
		</>
    ),
	targetUrl: "docs1/2022/08/2022-08-16-introducing-ofelimos-a-proof-of-useful-work-consensus-protocol"
  },
  
];






























function Port({ imageUrl, title, description, targetUrl }) {
  // const imgUrl = useBaseUrl(imageUrl); // not used right now
  const trgUrl = useBaseUrl(targetUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {targetUrl && (
        <Link className="navbar__link" to={trgUrl}>
          <div className="card">
            <div className="card__header">
				<div className="text--center">
					<img src={imageUrl} className={styles.featurePort } alt={name} />
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

export default function Portblog() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {PortList.map((props, idx) => (
            <Port key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
