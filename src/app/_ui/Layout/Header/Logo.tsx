import Link from 'next/link'
import { Avatar } from '@radix-ui/themes'

import profileImage from '~/shared/images/profile.png'

export const Logo = () => {
  return (
    <Link href="/">
      <Avatar size="3" radius="full" src={profileImage.src} fallback="👤" />
    </Link>
  )
}
