import React from 'react';
import clsx from 'clsx';
import styles from './TeamMembers.module.css';

const MemberList = [
  {
    name: 'To Nguyen Duy Tan',
    title: 'Engineer',
    imageUrl: '../img/team/tantnd.jpg',
    description: (
      <>
        Lorem ipsum dolor sit.
      </>
    ),
    socialLink: (
        <>
        linkedin: linkedin.com/in/tantnd
        </>
    ),
  },
  {
    name: 'Nguyen Anh Tien',
    title: 'Computer Science Experts',
    imageUrl: '../img/team/tienna.jpg',
    description: (
      <>
        Founder of the VILAI stake pool
        linkedin.com/in/tienna
      </>
    ),
    socialLink: (
        <>
        linkedin: linkedin.com/in/tienna
        </>
    ),
  },
  {
    name: 'Nguyen Van Hieu',
    title: 'Engineer',
    imageUrl: '../img/team/hieunv.jpg',
    description: (
      <>
        Computer Science Experts
      </>
    ),
    socialLink: (
        <>
        linkedin: linkedin.com/in/
        </>
    ),
  },
];

function Member({imageUrl, name, title, description, socialLink}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageUrl} className={styles.profilePic} alt={name} />
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
