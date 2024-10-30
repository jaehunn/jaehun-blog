import Image from 'next/image'

import profileImage from '~/images/profile.png'
import PROFILE from '~/constants/profile'

export default function AboutPage() {
  return (
    <div>
      <div>
        <Image src={profileImage} alt={''} />
      </div>

      <div>
        <div>
          {PROFILE.LAST_NAME}, {PROFILE.FIRST_NAME}
        </div>

        {PROFILE.POSITION.NAME && (
          <div>
            {PROFILE.POSITION.NAME}, <span>{PROFILE.POSITION.COMPANY}</span>
          </div>
        )}

        <div>{PROFILE.DESCRIPTION}</div>

        <div>{PROFILE.LOCATION.NAME}</div>

        <div>
          <div>{PROFILE.CONTANCTS.GMAIL.URL}</div>

          <div>
            <a
              href={PROFILE.CONTANCTS.LINKED_IN.URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {PROFILE.CONTANCTS.LINKED_IN.URL}
            </a>
          </div>

          <div>
            <a
              href={PROFILE.CONTANCTS.GITHUB.URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {PROFILE.CONTANCTS.GITHUB.URL}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
