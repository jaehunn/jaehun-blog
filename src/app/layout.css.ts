import { globalStyle, style } from '@vanilla-extract/css';

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const contentWrapper = style({
  maxWidth: 1000,
  width: '100%',
  padding: '2rem',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  fontSize: '1.5rem',
  fontWeight: 400,
});

export const headerNavList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const headerNavItem = style({
  selectors: {
    '&:hover': {
      color: 'var(--color-prettylights-syntax-keyword)',
    },
  },
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  fontSize: '1rem',
  fontWeight: 400,
});

export const footerNavList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const footerNavItem = style({
  selectors: {
    '&:hover': {
      color: 'var(--color-prettylights-syntax-keyword)',
    },
  },
});

globalStyle(`${footerNavItem} > a`, {
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});
