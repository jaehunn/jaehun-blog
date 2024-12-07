import styles from './Spacing.module.css'

type Props = {
  type?: 'small' | 'medium' | 'large'
}

export const Spacing = ({ type = 'medium' }: Props) => {
  return <div className={styles[type]} />
}
