import React from 'react';
import clsx from 'clsx';
import styles from './TeamMembers.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const MemberList = [
  {
    name: 'To Nguyen Duy Tan',
    title: 'Lead Engineer',
    imageUrl: '../img/team/tantnd.jpg',
	//imageUrl: '../img/team/2022-08-05-kachina-privacy-preserving-smart-contracts.007.jpeg',
    description: (
      <>
        An experienced engineer in Devevelop and Operation
      </>
    ),
    socialLink: (
      <a href="https://linkedin.com/in/tantnd" target="_blank">
        <LinkedInIcon color="primary"></LinkedInIcon>
      </a>
    ),
  },
  {
    name: 'Nguyen Anh Tien',
    title: 'Computer Science Experts',
    imageUrl: '../img/team/tienna.jpg',
    description: (
      <>
        Founder of the VILAI stake pool, former Experts at HPE
      </>
    ),
    socialLink: (
        <a href="http://linkedin.com/in/tienna" target="_blank">
          <LinkedInIcon color="primary"></LinkedInIcon>
        </a>
    ),
  },
  {
    name: 'Nguyen Van Hieu',
    title: 'MSc. Electronics and Telecommunication',
    imageUrl: '../img/team/hieunv.jpg',
    description: (
      <>
        Founder of HADA stake pool, member of Plutus Pioneer Program, Researcher at VAST.
      </>
    ),
    socialLink: (
        <a href="http://linkedin.com/in/nguyen-van-hieu-b4410121b">
          <LinkedInIcon color="primary"></LinkedInIcon>
        </a>
    ),
  },
];

function Member({imageUrl, name, title, description, socialLink}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageUrl} className={styles.featureSvg} alt={name} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{name}</h3>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{socialLink}</p>
      </div>
    </div>
  );
}

export default function TeamMembers() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {MemberList.map((props, idx) => (
            <Member key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
