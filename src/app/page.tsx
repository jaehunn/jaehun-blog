import Image from 'next/image';
import { FiBriefcase as PositionIcon } from '@react-icons/all-files/fi/FiBriefcase';
import { FiMapPin as LocationIcon } from '@react-icons/all-files/fi/FiMapPin';
import { CgMail as GmailIcon } from '@react-icons/all-files/cg/CgMail';
import { RiLinkedinBoxLine as LinkedInIcon } from '@react-icons/all-files/ri/RiLinkedinBoxLine';
import { VscGithubAlt as GithubIcon } from '@react-icons/all-files/vsc/VscGithubAlt';

import profileImage from '@/images/profile.png';
import PROFILE from '@/constants/profile';
import * as styles from './page.css';

export default function AboutPage() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['image']}>
        <Image src={profileImage} alt={''} />
      </div>

      <div className={styles['profile']}>
        <div className={styles['name']}>
          {PROFILE.LAST_NAME}, {PROFILE.FIRST_NAME}
        </div>

        {PROFILE.POSITION.NAME && (
          <div className={styles['position']}>
            <PositionIcon size="20" />
            {PROFILE.POSITION.NAME}, <span className={styles['positionCompany']}>{PROFILE.POSITION.COMPANY}</span>
          </div>
        )}

        <div className={styles['description']}>{PROFILE.DESCRIPTION}</div>

        <div className={styles['location']}>
          <LocationIcon size="20" />

          {PROFILE.LOCATION.NAME}
        </div>

        <div>
          <div className={styles['gmail']}>
            <GmailIcon size="20" />

            {PROFILE.CONTANCTS.GMAIL.URL}
          </div>

          <div className={styles['linkedIn']}>
            <LinkedInIcon size="20" />

            <a href={PROFILE.CONTANCTS.LINKED_IN.URL} target="_blank" rel="noreferrer noopener">
              {PROFILE.CONTANCTS.LINKED_IN.URL}
            </a>
          </div>

          <div className={styles['github']}>
            <GithubIcon size="20" />

            <a href={PROFILE.CONTANCTS.GITHUB.URL} target="_blank" rel="noreferrer noopener">
              {PROFILE.CONTANCTS.GITHUB.URL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
