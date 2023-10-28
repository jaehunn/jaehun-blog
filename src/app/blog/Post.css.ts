import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  gap: '2rem',
  padding: '1rem',
  overflow: 'hidden',
});

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: 'var(--color-prettylights-syntax-entity)',
});

export const createdAt = style({
  paddingBottom: '1rem',
  fontSize: '1rem',
  fontWeight: '400',
  color: 'var(--color-prettylights-syntax-comment)',
});

export const description = style({
  fontSize: '1rem',
  fontWeight: 400,
});
