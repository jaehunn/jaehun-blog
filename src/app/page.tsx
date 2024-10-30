import Image from 'next/image'

import profileImage from '~/images/profile.png'
import PROFILE from '~/constants/profile'
import styles from './page.module.scss'
import { Spacing } from '~/components/Spacing'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* @see {Image} https://nextjs.org/docs/pages/api-reference/components/image */}
      {/* <Image
        src={profileImage}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        width={300}
        height={300}
        alt=""
      /> */}

      <Spacing />

      <section className={styles.position}>
        <ul>
          {Object.entries(PROFILE['POSITION']).map(([key, value]) => {
            return (
              <>
                <li key={key}>{value}</li>

                <Spacing type="small" />
              </>
            )
          })}
        </ul>
      </section>

      <Spacing />

      <section className={styles.contacts}>
        <ul>
          {Object.entries(PROFILE['CONTANCTS']).map(([key, value]) => {
            return (
              <>
                <li key={key}>{value.URL}</li>

                <Spacing type="small" />
              </>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
