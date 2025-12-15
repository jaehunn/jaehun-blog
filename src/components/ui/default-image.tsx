interface DefaultImageProps {
  seed: string
  className?: string
}

export const DefaultImage = ({ className }: DefaultImageProps) => {
  return <div className={className} style={{ backgroundColor: '#f5f5f5' }} />
}
