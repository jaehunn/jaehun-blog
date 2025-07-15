import styles from './index.module.css'

interface Props {
  /** @see {spec} https://www.radix-ui.com/themes/docs/theme/spacing */
  size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
}

export const Spacing = ({ size }: Props) => {
  return <div className={styles.spacing} style={{ '--size': `var(--space-${size})` } as React.CSSProperties} />
}
